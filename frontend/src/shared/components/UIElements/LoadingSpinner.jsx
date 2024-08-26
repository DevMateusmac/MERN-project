/* eslint-disable react/prop-types */
export default function LoadingSpinner({asOverlay}) {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  )
}