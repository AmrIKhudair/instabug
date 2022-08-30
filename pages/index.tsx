import type { NextPage } from 'next'
import Head from 'next/head'
import useEvents from '../lib/useEvents'
import { useState } from 'react'
import FilterButton from '../components/FilterButton'

const Home: NextPage = () => {
  const [ q, setQ ] = useState('')
  const [ filter, setFilter ] = useState('')
  const { pages, loading, error, hasMore, loadMore } = useEvents({ q, filter })

  return (
    <main>
      <Head>
        <title>Instalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="w-[969px] h-[743px] bg-white rounded-[15px] m-auto font-['Inter'] text-[14px] flex flex-col before:absolute before:w-[933px] before:h-[743px] before:ml-[17px] before:border before:border-[#F0F0F0] before:shadow-[0px_3px_5px_rgba(0,0,0,0.2)] before:rounded-[14px]">
        <header className='h-[108px] bg-[#F5F5F5] rounded-t-[15px] mx-[18px] py-[18px] px-[23px] z-10'>
          <div className='flex h-[45px] border border-[#E0E0DF] rounded-[8px]'>
            <input className="flex-1 bg-transparent border-0 outline-0 m-[13px] font-['Inter'] text-[#959595]" onChange={e => setQ(e.target.value)} placeholder="Search name, email or action..." />
            <FilterButton onFilter={setFilter}/>
          </div>
          <div className='flex'>
            <div className='flex-1 font-semibold py-[14px] uppercase text-[#616161]'>ACTOR</div>
            <div className='flex-1 font-semibold py-[14px] uppercase text-[#616161]'>ACTION</div>
            <div className='flex-1 font-semibold py-[14px] uppercase text-[#616161]'>DATE</div>
          </div>
        </header>

        <main className='relative px-[23px] overflow-x-hidden overflow-y-auto no-scrollbar flex-1'>
          <div className='mx-[18px]'>
            { pages }
          </div>
        </main>

        <button className="mx-[18px] h-[52px] bg-[#F5F5F5] rounded-b-[15px] border-0 outline-0 font-['Inter'] font-semibold text-[14px] text-[#616161] tracking-[0.02em] uppercase z-10 disabled:cursor-not-allowed" onClick={loadMore} disabled={error || loading || !hasMore}>
          { error ? 'ERROR' : loading ? 'LOADING' : hasMore ? 'LOAD MORE' : 'THE END' }
        </button>
      </article>
        
    </main>
  )
}

export default Home
