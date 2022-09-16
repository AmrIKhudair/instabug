import { createRef, useLayoutEffect } from 'react'
import Event from '../types/Event'
import dayjs from 'dayjs'
import cn from 'classnames'

interface Props {
    event: Event,
    expanded?: boolean,
    onClick: () => void
}


export default function EventRow ({ event, expanded = false, onClick }: Props) {
    const wrapper = createRef<HTMLDivElement>()
    const card = createRef<HTMLDivElement>()
    const initial = event.actor_name[0].toUpperCase();

    useLayoutEffect(() => { 
        if (!wrapper.current) return
        if (!card.current) { wrapper.current.style.height = ''; return }
        wrapper.current.style.height = getComputedStyle(card.current).height
    })

    return (
        <div className={cn('flex cursor-pointer', {'py-[20px]': !expanded})} onClick={onClick} ref={wrapper}>
            { !expanded && (
                <>
                    <div className='flex-1 flex leading-[25px]'>
                        <div className='w-[25px] h-[25px] bg-gradient-to-br from-[#F3994A_14.17%] to-[#B325E2_84.99%] rounded-full inline-block mr-[15px] text-center text-white font-bold text-[12px] uppercase'>
                            {initial}
                        </div>
                        {event.actor_name}
                    </div>
                    <div className='flex-1 flex leading-[25px]'>{event.action.name}</div>
                    <div className='flex-1 flex leading-[25px]'>{dayjs(event.occured_at).format('MMM DD, hh:mm A')}</div>
                </>
            )}
            {
                expanded && (
                    <div className='absolute w-[964px] ml-[-39px] bg-white border border-[#DFDFDF] shadow-[0px_2px_5px_rgba(0,0,0,0.04)] rounded-[12px] z-10 py-[30px] px-[39px]' ref={card}>
                        <div className='flex py-[20px]'>
                            <div className='flex-1'>
                                <div className='font-medium uppercase text-[#929292] pb-[16px]'>ACTOR</div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>Name</div>
                                    <div className='table-cell pb-[12px]'>{event.actor_name}</div>
                                </div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>ID</div>
                                    <div className='table-cell pb-[12px]'>{event.actor_id}</div>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-medium uppercase text-[#929292] pb-[16px]'>ACTION</div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>Name</div>
                                    <div className='table-cell pb-[12px]'>{event.action.name}</div>
                                </div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>ID</div>
                                    <div className='table-cell pb-[12px]'>{event.action.id}</div>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <div className='font-medium uppercase text-[#929292] pb-[16px]'>DATE</div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>Readable</div>
                                    <div className='table-cell pb-[12px]'>{dayjs(event.occured_at).format('MMM DD, hh:mm A')}</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex py-[20px]'>
                            <div className='flex-1'>
                                <div className='font-medium uppercase text-[#929292] pb-[16px]'>METADATA</div>
                                {Object.entries(event.metadata).map(([key, value]) => (
                                    <div className='table-row' key={key}>
                                        <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>{key}</div>
                                        <div className='table-cell pb-[12px]'>{typeof value === 'object' ? JSON.stringify(value) : value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex-1'>
                                <div className='font-medium uppercase text-[#929292] pb-[16px]'>TARGET</div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>Name</div>
                                    <div className='table-cell pb-[12px]'>{event.target_name}</div>
                                </div>
                                <div className='table-row'>
                                    <div className='table-cell w-[90px] text-[#929292] pb-[12px]'>ID</div>
                                    <div className='table-cell pb-[12px]'>{event.target_id}</div>
                                </div>
                            </div>
                            <div className='flex-1'></div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}