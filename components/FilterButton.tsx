import { useState } from "react"
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterButton({ onFilter } : { onFilter: (filter: string) => void }) {
    const [toggle, setToggle] = useState(false)
    const [actor, setActor] = useState('')
    const [target, setTarget] = useState('')
    const [action, setAction] = useState('')

    function handleFilter() {
        let filter = ''
        if (actor) filter += `&actor_id=${actor}`
        if (target) filter += `&target_id=${action}`
        if (action) filter += `&action_id=${action}`
        onFilter(filter)
    }

    return (
        <div className="relative flex px-[15px] border-l">
            <button className="font-['Inter'] text-[#575757] uppercase flex items-center" onClick={() => setToggle(!toggle)}>
                <FilterListIcon /> Filter
            </button>
            
            { toggle && (
                <>
                    <div className="fixed w-full h-full left-0 top-0 z-10" onClick={() => setToggle(false)} />
                    <div className="absolute top-[50px] right-0 w-[400px] bg-white rounded border p-3">
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Actor ID</div>
                            <input className="flex-[2] border p-1" value={actor} onChange={e => setActor(e.target.value)}/>
                        </div>
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Target ID</div>
                            <input className="flex-[2] border p-1" value={target} onChange={e => setTarget(e.target.value)} />
                        </div>
                        <div className="flex items-center pb-2">
                            <div className="flex-1">Action ID</div>
                            <input className="flex-[2] border p-1" value={action} onChange={e => setAction(e.target.value)} />
                        </div>
                        <button className="w-full bg-[#F5F5F5] font-['Inter'] font-semibold text-[14px] text-[#616161] tracking-[0.02em] uppercase rounded p-2" onClick={handleFilter}>Filter</button>
                    </div>
                </>
            )}
        </div>
    )
}