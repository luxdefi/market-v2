import useCommunity from 'hooks/useCommunity'
import useSearchCollections from 'hooks/useSearch'
import Head from 'next/head'
import React, { FC } from 'react'
import CommunityGrid from './CommunityGrid'
import SearchCollections from './SearchCollections'

type Props = {
  wildcard: string
  apiBase: string
}

const CommunityLanding: FC<Props> = ({ apiBase, wildcard }) => {
  const communities = useCommunity(apiBase, wildcard)
  const search = useSearchCollections(apiBase, wildcard)

  const { data } = communities.communities

  const size = (data && data[data.length - 1].collections?.length) || 0

  const isBigCommunity = size > 8

  return (
    <>
      <Head>
        {wildcard === 'www' ? (
          <title>
            {wildcard.toUpperCase()} Community Marketplace | Reservoir Market
          </title>
        ) : (
          <title>
            {wildcard.toUpperCase()} Community Marketplace | Powered by
            Reservoir
          </title>
        )}
        <meta
          name="description"
          content={
            communities.communities.data?.[0].collections?.[0].collection
              ?.description
          }
        />
      </Head>
      <header className="mt-8 mb-14 flex items-center justify-center gap-5">
        <img
          className="h-[50px] w-[50px] rounded-full"
          src={
            communities.communities.data?.[0].collections?.[0].collection?.image
          }
        />
        <h1 className=" text-xl font-bold uppercase">{wildcard} Community</h1>
      </header>
      {isBigCommunity && (
        <div className="mb-12 grid justify-center">
          <SearchCollections
            apiBase={apiBase}
            fallback={search}
            communityId={wildcard}
          />
        </div>
      )}
      <CommunityGrid communities={communities} wildcard={wildcard} />
    </>
  )
}

export default CommunityLanding
