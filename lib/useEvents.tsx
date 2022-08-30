import { createContext, Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import EventRow from '../components/EventRow'
import Event from '../types/Event'

type Options = {
    q: string
}

type PageProps = {
    index: number,
    options: Options,
    expanded: string,
    setExpanded: Dispatch<SetStateAction<string>>,
    onLoading?: (loading: boolean) => any,
    onError?: (error: boolean) => any,
    onHasMore?: (hasMore: boolean) => void,
}

type EventResponse = {
    events: Event[],
    hasMore: boolean
}

export default function useEvents(options: Options) {
    const [index, setIndex] = useState(1)
    const pages = []
    const loadMore = () => setIndex(index + 1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [expanded, setExpanded] = useState('')

    for (let i = 1; i < index; i++) {
        pages.push(<Page index={i} options={options} expanded={expanded} setExpanded={setExpanded} key={i} />)
    }

    pages.push(<Page index={index} options={options} expanded={expanded} setExpanded={setExpanded} onLoading={setLoading} onError={setError} onHasMore={setHasMore} key={index} />)

    return {pages, loading, error, hasMore, loadMore}
    
}

function Page ({ index, options, expanded, setExpanded, onLoading, onError, onHasMore } : PageProps ) {
    const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())
    let url = `/api/events?page=${index}`
    if (options.q) url += `&q=${options.q}`
    const { data, error } = useSWR<EventResponse>(url, fetcher);
  
    if (onError) onError(!!error)
    if (onLoading) onLoading(!data)
    if (error || !data) return <></>;
    if (onHasMore) onHasMore(data.hasMore)
    return <>{data.events.map(event => <EventRow event={event} expanded={expanded === event.id} onClick={() => setExpanded(event.id)} key={event.id} />)}</>
}