import { createRef, useLayoutEffect } from 'react';
import styles from '../styles/Home.module.css'
import Event from '../types/Event'

interface Props {
    event: Event,
    expanded?: boolean,
    onClick: () => void
}

export default function EventRow ({ event, expanded = false, onClick }: Props) {
    const wrapper = createRef<HTMLDivElement>();
    const card = createRef<HTMLDivElement>();

    useLayoutEffect(() => { 
        if (!wrapper.current) return
        if (!card.current) { wrapper.current.style.height = ''; return }
        wrapper.current.style.height = getComputedStyle(card.current).height;
    })

    return (
        <div className={expanded ? styles.expanded : styles.row} onClick={onClick} ref={wrapper}>
            { !expanded && (
                <>
                    <div className={styles.td}>{event.actor_name}</div>
                    <div className={styles.td}>{event.action.name}</div>
                    <div className={styles.td}>{event.occured_at}</div>
                </>
            )}
            {
                expanded && (
                    <div className={styles.card} ref={card}>
                        <div className={styles.row}>
                            <div className={styles.td}>
                                <div className={styles.card_title}>ACTOR</div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>Name</div>
                                    <div className={styles.property_value}>{event.actor_name}</div>
                                </div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>ID</div>
                                    <div className={styles.property_value}>{event.actor_id}</div>
                                </div>
                            </div>
                            <div className={styles.td}>
                                <div className={styles.card_title}>ACTION</div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>Name</div>
                                    <div className={styles.property_value}>{event.action.name}</div>
                                </div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>ID</div>
                                    <div className={styles.property_value}>{event.action.id}</div>
                                </div>
                            </div>
                            <div className={styles.td}>
                                <div className={styles.card_title}>DATE</div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>Readable</div>
                                    <div className={styles.property_value}>{event.occured_at}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.td}>
                                <div className={styles.card_title}>METADATA</div>
                                {Object.entries(event.metadata).map(([key, value]) => (
                                    <div className={styles.property_row} key={key}>
                                        <div className={styles.property_name}>{key}</div>
                                        <div className={styles.property_value}>{value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.td}>
                                <div className={styles.card_title}>TARGET</div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>Name</div>
                                    <div className={styles.property_value}>{event.target_name}</div>
                                </div>
                                <div className={styles.property_row}>
                                    <div className={styles.property_name}>ID</div>
                                    <div className={styles.property_value}>{event.target_id}</div>
                                </div>
                            </div>
                            <div className={styles.td}></div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}