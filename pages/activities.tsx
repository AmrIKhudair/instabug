import Head from "next/head";
import useSWR from "swr";
import Activity from "../components/Activity";
import { Activity as IActivity } from "../types/Activity";

export default function Activities () {
    const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json())
    const {data, error} = useSWR<IActivity[]>('/api/activities', fetcher)

    if (error) return <h1>ERROR</h1>
    if (!data) return <h1>Loading...</h1>

    return (
        <div>
            <Head>
                <title>Activities</title>
            </Head>

            <main>
                <h1 className="font-['Inter'] font-[700] text-[14px] leading-[17px] mb-[29px]">
                    Activity
                </h1>

                <ul className="list-none">
                    {data.map(item => <li key={item.id}><Activity value={item} /></li>)}
                </ul>
            </main>
        </div>
    )
}