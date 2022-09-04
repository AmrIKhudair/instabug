import cn from "classnames"

interface Props {
    toggle: boolean
    setToggle: (toggle: boolean) => void
}

export default function LiveButton({ toggle, setToggle } : Props) {

    return (
        <button className="font-['Inter'] text-[#575757] uppercase flex items-center px-[15px] border-l" onClick={() => setToggle(!toggle)}>
            <span className={cn({'text-[#ff0000] font-bold': toggle})}>⬤ Live</span>
        </button>
    )
}