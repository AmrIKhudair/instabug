import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
    icon: string,
    actor_name: string,
    text: JSX.Element,
    time: string,
}

dayjs.extend(relativeTime)

export default function BasicActivity ({ icon, actor_name, text, time }: Props) {
    return (
        <div className="flex items-center m-1 font-['Inter'] text-[12px] leading-[15px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt='' width={22} height={22}
                className='inline-block object-scale-down' />
            <strong className="ml-[11px]">{actor_name}&nbsp;</strong>
            <span className="mr-[8px]">{text}</span>
            <time dateTime={time}>{dayjs(time).fromNow()}.</time>
        </div>
    )
}