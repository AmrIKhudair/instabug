import Image from "next/image";
import EventOptions from "../types/EventOptions";

function exportEvents(options: EventOptions) {
    let url = '/api/events.csv?' + options.filter
    if (options.q) url += '&q=' + options.q

    const a = document.createElement('a')
    a.href = url
    a.download = 'events.csv'
    a.click();
}

export default function ExportButton({ options }: { options: EventOptions }) {
    return (
        <button className="font-['Inter'] text-[#575757] uppercase flex items-center px-[15px] border-l" onClick={() => exportEvents(options)}>
            <Image src="/icons/export.svg" width={11} height={15} alt='' />&nbsp;Export
        </button>
    )
}