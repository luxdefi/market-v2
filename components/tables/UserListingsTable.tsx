<<<<<<< HEAD
import {
  ComponentProps,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import { useSigner } from 'wagmi'
import Toast from 'components/Toast'
import CancelListing from 'components/CancelListing'
import FormatCrypto from 'components/FormatCrypto'
import useCoinConversion from 'hooks/useCoinConversion'
import { formatDollar } from 'lib/numbers'
import { useListings } from '@reservoir0x/reservoir-kit-ui'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import * as Dialog from '@radix-ui/react-dialog'
import LoadingIcon from 'components/LoadingIcon'
import { useMediaQuery } from '@react-hookz/web'

const API_BASE =
  process.env.NEXT_PUBLIC_RESERVOIR_API_BASE || 'https://api.reservoir.tools'

type Props = {
  collectionIds?: string[]
  modal: {
    isInTheWrongNetwork: boolean | undefined
    setToast: (data: ComponentProps<typeof Toast>['data']) => any
  }
}

const UserListingsTable: FC<Props> = ({ modal, collectionIds }) => {
  const router = useRouter()
  const isMobile = useMediaQuery('only screen and (max-width : 730px)')
  const [showActive, setShowActive] = useState(true)
  const { address } = router.query
  const params: Parameters<typeof useListings>['0'] = {
    maker: address as string,
    includeMetadata: true,
    status: showActive ? 'active' : 'inactive',
  }
  if (collectionIds) {
    params.contracts = collectionIds
  }

  const {
    data: listings,
    fetchNextPage,
    mutate,
    setSize,
    isFetchingInitialData,
  } = useListings(params, {
    revalidateOnMount: false,
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    mutate()
    return () => {
      setSize(1)
    }
  }, [])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isFetchingInitialData) {
    return (
      <div className="my-20 flex justify-center">
        <LoadingIcon />
=======
import { ComponentProps, FC } from 'react'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import FormatEth from 'components/FormatEth'
import { useAccount, useSigner } from 'wagmi'
import Toast from 'components/Toast'
import CancelListing from 'components/CancelListing'
import useUserAsks from 'hooks/useUserAsks'

type Props = {
  data: ReturnType<typeof useUserAsks>
  isOwner: boolean
  mutate: () => any
  modal: {
    accountData: ReturnType<typeof useAccount>
    collectionId: string | undefined
    isInTheWrongNetwork: boolean | undefined
    setToast: (data: ComponentProps<typeof Toast>['data']) => any
    signer: ReturnType<typeof useSigner>['data']
  }
}

const UserListingsTable: FC<Props> = ({ modal, mutate, isOwner, data }) => {
  const { data: listings, ref } = data

  if (listings.length === 0) {
    return (
      <div className="reservoir-body mt-14 grid justify-center dark:text-white">
        You don&apos;t have any items listed for sale.
>>>>>>> d73def8 (initial commit)
      </div>
    )
  }

  return (
<<<<<<< HEAD
    <div className="mb-11 overflow-x-auto">
      <ActiveFilters setShowActive={setShowActive} showActive={showActive} />
      {listings.length === 0 && (
        <div className="mt-14 grid justify-center dark:text-white">
          You don&apos;t have any {showActive ? 'active' : 'inactive'} listings.
        </div>
      )}
      {isMobile
        ? listings.map((listing, index, arr) => (
            <UserListingsMobileRow
              key={`${listing?.id}-${index}`}
              ref={index === arr.length - 5 ? ref : null}
              listing={listing}
              modal={modal}
              mutate={mutate}
            />
          ))
        : listings.length > 0 && (
            <table className="min-w-full table-auto dark:divide-neutral-600">
              <thead className="bg-white dark:bg-black">
                <tr>
                  {['Item', 'Price', 'Expiration', 'Marketplace'].map(
                    (item) => (
                      <th
                        key={item}
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-neutral-600 dark:text-white"
                      >
                        {item}
                      </th>
                    )
                  )}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Cancel</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index, arr) => (
                  <UserListingsTableRow
                    key={`${listing?.id}-${index}`}
                    ref={index === arr.length - 5 ? ref : null}
                    listing={listing}
                    modal={modal}
                    mutate={mutate}
                  />
                ))}
              </tbody>
            </table>
          )}
=======
    <div className="mb-11 overflow-x-auto border-b border-gray-200 shadow dark:border-neutral-600 sm:rounded-lg">
      <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-neutral-600">
        <thead className="bg-gray-50 dark:bg-neutral-900">
          <tr>
            {['Item', 'Price', 'Expiration'].map((item) => (
              <th
                key={item}
                scope="col"
                className="reservoir-label-l px-6 py-3 text-left dark:text-white"
              >
                {item}
              </th>
            ))}
            {isOwner && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {listings.map((position, index, arr) => {
            const {
              collectionName,
              contract,
              expiration,
              id,
              image,
              name,
              tokenHref,
              tokenId,
              price,
            } = processListing(position)

            return (
              <tr
                key={`${position?.id}-${index}`}
                ref={index === arr.length - 5 ? ref : null}
                className="group h-[80px] even:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:even:bg-neutral-800"
              >
                {/* ITEM */}
                <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
                  <Link href={tokenHref}>
                    <a className="flex items-center gap-2">
                      <div className="relative h-10 w-10">
                        {image && (
                          <div className="aspect-w-1 aspect-h-1 relative">
                            <img
                              alt={`${position?.id} Listing`}
                              src={optimizeImage(image, 35)}
                              className="w-[35px] object-contain"
                              width="35"
                              height="35"
                            />
                          </div>
                        )}
                      </div>
                      <span className="whitespace-nowrap">
                        <div className="reservoir-body dark:text-white ">
                          {collectionName}
                        </div>
                        <div className="reservoir-h6 font-headings dark:text-white ">
                          {name}
                        </div>
                      </span>
                    </a>
                  </Link>
                </td>

                {/* PRICE */}
                <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
                  <FormatEth amount={price} />
                </td>

                {/* EXPIRATION */}
                <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
                  {expiration}
                </td>
                {isOwner && (
                  <td className="reservoir-body flex justify-end whitespace-nowrap px-6 py-4 dark:text-white">
                    <CancelListing
                      data={{
                        collectionId: modal?.collectionId,
                        id,
                        contract,
                        tokenId,
                      }}
                      signer={modal.signer}
                      show={true}
                      isInTheWrongNetwork={modal.isInTheWrongNetwork}
                      setToast={modal.setToast}
                      mutate={mutate}
                    />
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
>>>>>>> d73def8 (initial commit)
    </div>
  )
}

<<<<<<< HEAD
<<<<<<< HEAD
type UserListingsRowProps = {
  listing: ReturnType<typeof useListings>['data'][0]
  modal: Props['modal']
  mutate: ReturnType<typeof useListings>['mutate']
  ref: null | ((node?: Element | null) => void)
}

const UserListingsTableRow = ({
  listing,
  modal,
  mutate,
  ref,
}: UserListingsRowProps) => {
  const { data: signer } = useSigner()
=======
type UserListingsTableRowProps = {
  listing: Props['data']['data'][0]
  modal: Props['modal']
  isOwner: Props['isOwner']
  mutate: Props['mutate']
  ref: null | ((node?: Element | null) => void)
}

const UseListingsTableRow = ({
  listing,
  modal,
  isOwner,
  mutate,
  ref,
}: UserListingsTableRowProps) => {
>>>>>>> d73def8 (initial commit)
  const usdConversion = useCoinConversion(
    listing?.price?.currency?.symbol ? 'usd' : undefined,
    listing?.price?.currency?.symbol
  )

  const usdPrice =
    usdConversion && listing?.price?.amount?.decimal
      ? usdConversion * listing?.price?.amount?.decimal
      : null

  const {
    collectionName,
    contract,
    expiration,
    id,
    image,
    name,
    tokenHref,
    tokenId,
    price,
<<<<<<< HEAD
    source,
=======
>>>>>>> d73def8 (initial commit)
  } = processListing(listing)

  return (
    <tr
      ref={ref}
<<<<<<< HEAD
      className="group h-[80px] border-b-[1px] border-solid border-b-neutral-300 bg-white dark:border-b-neutral-600 dark:bg-black"
    >
      {/* ITEM */}
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
        <Link href={tokenHref}>
          <a className="flex items-center gap-2">
            <div className="relative h-16 w-16">
              {image && (
                <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
                  <img
                    src={optimizeImage(image, 64)}
                    alt="Bid Image"
                    className="w-[64px] object-contain"
                    width="64"
                    height="64"
=======
      className="group h-[80px] even:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:even:bg-neutral-800"
    >
      {/* ITEM */}
      <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
        <Link href={tokenHref}>
          <a className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              {image && (
                <div className="aspect-w-1 aspect-h-1 relative">
                  <img
                    alt={`${listing?.id} Listing`}
                    src={optimizeImage(image, 35)}
                    className="w-[35px] object-contain"
                    width="35"
                    height="35"
>>>>>>> d73def8 (initial commit)
                  />
                </div>
              )}
            </div>
            <span className="whitespace-nowrap">
<<<<<<< HEAD
              <div className="reservoir-h6 max-w-[250px] overflow-hidden text-ellipsis font-headings text-base dark:text-white">
                {name}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                {collectionName}
              </div>
=======
              <div className="reservoir-body dark:text-white ">
                {collectionName}
              </div>
              <div className="reservoir-h6 font-headings dark:text-white ">
                {name}
              </div>
>>>>>>> d73def8 (initial commit)
            </span>
          </a>
        </Link>
      </td>

      {/* PRICE */}
<<<<<<< HEAD
      <td className="whitespace-nowrap px-6 py-4 dark:text-white">
=======
      <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
>>>>>>> d73def8 (initial commit)
        <FormatCrypto
          amount={price?.amount?.decimal}
          address={price?.currency?.contract}
          decimals={price?.currency?.decimals}
<<<<<<< HEAD
          maximumFractionDigits={8}
        />
        {usdPrice && (
          <div className="text-xs text-neutral-600 dark:text-neutral-300">
=======
        />
        {usdPrice && (
          <div className="text-sm text-neutral-600 dark:text-neutral-300">
>>>>>>> d73def8 (initial commit)
            {formatDollar(usdPrice)}
          </div>
        )}
      </td>

      {/* EXPIRATION */}
<<<<<<< HEAD
      <td className="px-6 py-4 font-light text-neutral-600 dark:text-neutral-300">
        {expiration}
      </td>

      {/* MARKETPLACE */}
      <td className="whitespace-nowrap px-6 py-4">
        <a
          href={source.link || '#'}
          target="_blank"
          rel="noreferrer"
          className="flex gap-1 font-light text-primary-700 dark:text-primary-300"
        >
          {source.icon && (
            <img className="h-6 w-6" alt="Source Icon" src={source.icon} />
          )}
          <span className="max-w-[200px] overflow-hidden text-ellipsis">
            {source.name}
          </span>
        </a>
      </td>

      <td className="sticky top-0 right-0 whitespace-nowrap dark:text-white">
        <div className="flex items-center">
=======
      <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
        {expiration}
      </td>
      {isOwner && (
        <td className="reservoir-body flex justify-end whitespace-nowrap px-6 py-4 dark:text-white">
>>>>>>> d73def8 (initial commit)
          <CancelListing
            data={{
              id,
              contract,
              tokenId,
            }}
<<<<<<< HEAD
            signer={signer}
=======
            signer={modal.signer}
>>>>>>> d73def8 (initial commit)
            show={true}
            isInTheWrongNetwork={modal.isInTheWrongNetwork}
            setToast={modal.setToast}
            mutate={mutate}
<<<<<<< HEAD
            trigger={
              <Dialog.Trigger className="btn-primary-outline min-w-[120px] bg-white py-[3px] text-sm text-[#FF3B3B] dark:border-neutral-600 dark:bg-black dark:text-[#FF9A9A] dark:ring-primary-900 dark:focus:ring-4">
                Cancel
              </Dialog.Trigger>
            }
          />
        </div>
      </td>
=======
          />
        </td>
      )}
>>>>>>> d73def8 (initial commit)
    </tr>
  )
}

<<<<<<< HEAD
const UserListingsMobileRow = ({
  listing,
  modal,
  mutate,
  ref,
}: UserListingsRowProps) => {
  const { data: signer } = useSigner()
  const usdConversion = useCoinConversion(
    listing?.price?.currency?.symbol ? 'usd' : undefined,
    listing?.price?.currency?.symbol
  )

  const usdPrice =
    usdConversion && listing?.price?.amount?.decimal
      ? usdConversion * listing?.price?.amount?.decimal
      : null

  const {
    collectionName,
    contract,
    expiration,
    id,
    image,
    name,
    tokenHref,
    tokenId,
    price,
    source,
  } = processListing(listing)

  return (
    <div
      className="border-b-[1px] border-solid border-b-neutral-300	py-[16px]"
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <Link href={tokenHref || '#'}>
          <a className="flex items-center gap-2">
            <div className="relative h-14 w-14">
              {image && (
                <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded">
                  <img
                    src={optimizeImage(image, 56)}
                    alt="Bid Image"
                    className="w-[56px] object-contain"
                    width="56"
                    height="56"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="reservoir-h6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-headings text-sm dark:text-white">
                {name}
              </div>
              <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300">
                {collectionName}
              </div>
            </div>
          </a>
        </Link>
        <div className="flex flex-col">
          <FormatCrypto
            amount={price?.amount?.decimal}
            address={price?.currency?.contract}
            decimals={price?.currency?.decimals}
            maximumFractionDigits={8}
          />
          {usdPrice && (
            <span className="mt-1 text-right text-xs text-neutral-600 dark:text-neutral-300">
              {formatDollar(usdPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <a
            href={source.link || '#'}
            target="_blank"
            rel="noreferrer"
            className="mb-1 flex items-center gap-1 font-light text-primary-700 dark:text-primary-300"
          >
            {source.icon && (
              <img className="h-6 w-6" alt="Source Icon" src={source.icon} />
            )}
            <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xs">
              {source.name}
            </span>
          </a>
          <div className="text-xs font-light text-neutral-600 dark:text-neutral-300">{`Expires ${expiration}`}</div>
        </div>
        <CancelListing
          data={{
            id,
            contract,
            tokenId,
          }}
          signer={signer}
          show={true}
          isInTheWrongNetwork={modal.isInTheWrongNetwork}
          setToast={modal.setToast}
          mutate={mutate}
          trigger={
            <Dialog.Trigger className="btn-primary-outline min-w-[120px] bg-white py-[3px] text-sm text-[#FF3B3B] dark:border-neutral-600 dark:bg-black dark:text-[#FF9A9A] dark:ring-primary-900 dark:focus:ring-4">
              Cancel
            </Dialog.Trigger>
          }
        />
      </div>
    </div>
  )
}

type ActiveFilterProps = {
  showActive: boolean
  setShowActive: Dispatch<SetStateAction<boolean>>
}

const ActiveFilters: FC<ActiveFilterProps> = ({
  showActive,
  setShowActive,
}) => {
  return (
    <div className="flex gap-3">
      <button
        className={`rounded-full border-[1px] border-solid border-neutral-300 py-3  px-4 hover:opacity-[0.85] dark:border-neutral-600 dark:text-white ${
          showActive
            ? 'bg-primary-100 dark:bg-neutral-600'
            : 'bg-white dark:bg-black'
        }`}
        onClick={() => setShowActive(true)}
      >
        Active
      </button>
      <button
        className={`${
          !showActive
            ? 'bg-primary-100 dark:bg-neutral-600'
            : 'bg-white dark:bg-black'
        }
      rounded-full border-[1px] border-solid border-neutral-300 py-3 px-4 hover:opacity-[0.85]
    dark:border-neutral-600 dark:text-white`}
        onClick={() => setShowActive(false)}
      >
        Inactive
      </button>
    </div>
  )
}

export default UserListingsTable

function processListing(listing: ReturnType<typeof useListings>['data'][0]) {
  const tokenId = listing?.tokenSetId?.split(':')[2]
  const contract = listing?.tokenSetId?.split(':')[1]
  const collectionRedirectUrl = `${API_BASE}/redirect/collections/${listing?.contract}/image/v1`
=======
=======
>>>>>>> 79e0b24 (Update look and feel)
export default UserListingsTable

function processListing(
  listing: NonNullable<NonNullable<Props['data']['data']>>[0] | undefined
) {
  const tokenId = listing?.tokenSetId?.split(':')[2]
  const contract = listing?.tokenSetId?.split(':')[1]
>>>>>>> d73def8 (initial commit)

  const data = {
    contract,
    tokenId,
<<<<<<< HEAD
    image: listing?.metadata?.data?.image || collectionRedirectUrl,
=======
    image: listing?.metadata?.data?.image,
>>>>>>> d73def8 (initial commit)
    name: listing?.metadata?.data?.tokenName,
    expiration:
      listing?.expiration === 0
        ? 'Never'
        : DateTime.fromMillis(+`${listing?.expiration}000`).toRelative(),
    id: listing?.id,
    collectionName: listing?.metadata?.data?.collectionName,
    price: listing?.price,
<<<<<<< HEAD
    source: {
      icon: (listing?.source?.icon as string) || null,
      name: (listing?.source?.name as string) || null,
      link:
        listing?.source?.domain && tokenId
          ? `${API_BASE}/redirect/sources/${listing?.source?.domain}/tokens/${contract}:${tokenId}/link/v2`
          : `https://${listing?.source?.domain as string}` || null,
    },
=======
>>>>>>> d73def8 (initial commit)
  }

  const tokenHref = `/${data.contract}/${data.tokenId}`

  return { ...data, tokenHref }
}
