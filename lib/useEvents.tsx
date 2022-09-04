import { useEffect, useState } from "react";
import useSWR from "swr";
import EventRow from '../components/EventRow'
import Event from '../types/Event'
import EventOptions from "../types/EventOptions";

interface PageProps {
    index: number
    options: EventOptions
    expanded: string
    setExpanded: (expanded: string) => void
    onLoading?: (loading: boolean) => any
    onError?: (error: boolean) => any
    onHasMore?: (hasMore: boolean) => void
}

interface EventResponse {
    events: Event[]
    hasMore: boolean
}

interface LiveEventsProps {
    toggle: boolean 
    options: EventOptions
    expanded: string
    setExpanded: (expanded: string) => void
}

export default function useEvents(options: EventOptions, live = false) {
    const [index, setIndex] = useState(1)
    const loadMore = () => setIndex(index + 1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [expanded, setExpanded] = useState('')

    const [liveEvents, setLiveEvents] = useState(<></>)
    const [pages, setPages] = useState<JSX.Element[]>([])

    useEffect(() => {
        const newLiveEvents = <LiveEvents toggle={live} options={options} expanded={expanded} setExpanded={setExpanded} />
        setLiveEvents(newLiveEvents) 
    }, [live, options, expanded])

    useEffect(() => {
        const pages = []

        for (let i = 1; i < index; i++) {
            pages.push(<Page index={i} options={options} expanded={expanded} setExpanded={setExpanded} key={i} />)
        }
    
        pages.push(<Page index={index} options={options} expanded={expanded} setExpanded={setExpanded} onLoading={setLoading} onError={setError} onHasMore={setHasMore} key={index} />)

        setPages(pages)
    }, [index, options, expanded])
    

    return {liveEvents, pages, loading, error, hasMore, loadMore}
    
}

function Page ({ index, options, expanded, setExpanded, onLoading, onError, onHasMore } : PageProps ) {
    const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())
    let url = `/api/events?page=${index}` + options.filter
    if (options.q) url += `&q=${options.q}`
    const { data, error } = useSWR<EventResponse>(url, fetcher);
  
    if (onError) onError(!!error)
    if (onLoading) onLoading(!data)
    if (error || !data) return <></>;
    if (onHasMore) onHasMore(data.hasMore)
    return <>{data.events.map(event => <EventRow event={event} expanded={expanded === event.id} onClick={() => setExpanded(expanded === event.id ? '' : event.id)} key={event.id} />)}</>
}

function LiveEvents ({toggle, options, expanded, setExpanded}: LiveEventsProps) {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        if (!toggle) return

        setEvents(() => [])

        let url = '/api/events.sse?' + options.filter
        url += '&q=' + options.q

        const es = new EventSource(url)

        es.addEventListener('created', e => {
            const event = JSON.parse(e.data)

            setEvents(events => {
                events.unshift(event)
                return events
            })
        })

        return () => es.close()
    }, [toggle, options.q, options.filter])

    return <>{events.map(event => <EventRow event={event} expanded={expanded === event.id} onClick={() => setExpanded(expanded === event.id ? '' : event.id)} key={event.id} />)}</>
}