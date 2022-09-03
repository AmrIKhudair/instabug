import Image from "next/image"
import { useState } from "react"

export default function FilterButton({ onFilter } : { onFilter: (filter: string) => void }) {
    const [toggle, setToggle] = useState(false)
    const [actorId, setActorId] = useState('')
    const [targetId, setTargetId] = useState('')
    const [actionId, setActionId] = useState('')
    const [actionName, setActionName] = useState('')

    function handleFilter() {
        let filter = ''
        if (actorId) filter += `&actor_id=${actorId}`
        if (targetId) filter += `&target_id=${actionId}`
        if (actionId) filter += `&action_id=${actionId}`
        if (actionName) filter += `&action_name=${actionName}`
        onFilter(filter)
    }

    return (
        <div className="relative flex px-[15px] border-l">
            <button className="font-['Inter'] text-[#575757] uppercase flex items-center" onClick={() => setToggle(!toggle)}>
                <Image src="/icons/filter.svg" width={15} height={10} alt='' />&nbsp;Filter
            </button>

            { toggle && (
                <>
                    <div className="fixed w-full h-full left-0 top-0" onClick={() => setToggle(false)} />
                    <div className="absolute top-[50px] right-0 w-[400px] bg-white rounded border p-3">
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Actor ID</div>
                            <input className="flex-[2] border p-1" value={actorId} onChange={e => setActorId(e.target.value)}/>
                        </div>
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Target ID</div>
                            <input className="flex-[2] border p-1" value={targetId} onChange={e => setTargetId(e.target.value)} />
                        </div>
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Action ID</div>
                            <input className="flex-[2] border p-1" value={actionId} onChange={e => setActionId(e.target.value)} />
                        </div>
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Action Name</div>
                            <input className="flex-[2] border p-1" value={actionName} onChange={e => setActionName(e.target.value)} />
                        </div>
                        <button className="w-full bg-[#F5F5F5] font-['Inter'] font-semibold text-[14px] text-[#616161] tracking-[0.02em] uppercase rounded p-2" onClick={handleFilter}>Filter</button>
                    </div>
                </>
            )}
        </div>
    )
}