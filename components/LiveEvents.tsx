import { useEffect, useState } from 'react'
import Event from '../types/Event'
import EventOptions from '../types/EventOptions'
import EventRow from './EventRow'

interface Props {
    toggle: boolean
    options: EventOptions
}

