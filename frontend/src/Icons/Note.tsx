interface Props {
  color?: string
  width?: number | string
  height?: number | string
}

export function Note({ color, height, width }: Props) {
  const newColor = color != null && color === 'secondary' ? 'white' : '#104D86'
  const newHeight = height != null ? height : '19'
  const newWidth = width != null ? width : '19'
  return (
    <svg
      width={newWidth}
      height={newHeight}
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.1984 18.0668H15.5318V17.7335V9.63908L16.1316 9.03921V17.7335C16.1316 17.981 16.0333 18.2183 15.8583 18.3934C15.6833 18.5684 15.4459 18.6667 15.1984 18.6667H1.26653C1.01903 18.6667 0.781671 18.5684 0.606662 18.3934L0.372181 18.6278L0.606662 18.3934C0.431652 18.2183 0.333333 17.981 0.333333 17.7335V3.8016C0.333333 3.5541 0.431652 3.31674 0.606662 3.14173C0.781671 2.96672 1.01903 2.8684 1.26653 2.8684H10.1001L9.50026 3.46827H1.26653H0.933202V3.8016V17.7335V18.0668H1.26653H15.1984Z'
        stroke={newColor}
        strokeWidth='0.666667'
      />
      <path
        d='M18.4647 2.66942L18.465 2.66975C18.5289 2.73349 18.5796 2.80923 18.6142 2.8926C18.6488 2.97598 18.6666 3.06537 18.6666 3.15565C18.6666 3.24592 18.6488 3.33531 18.6142 3.41869C18.5796 3.50207 18.5289 3.5778 18.465 3.64154L18.4636 3.64299L9.86957 12.3186L6.91325 12.9709C6.86495 12.9751 6.81633 12.9746 6.7681 12.9693L6.75073 12.9673L6.73325 12.9673C6.63184 12.9668 6.53181 12.9438 6.44035 12.9C6.34888 12.8563 6.26825 12.7927 6.20426 12.7141C6.14027 12.6354 6.09451 12.5436 6.07027 12.4451C6.04635 12.3479 6.04397 12.2467 6.06328 12.1486L6.74373 9.19996L15.3584 0.53499C15.3585 0.53493 15.3586 0.534869 15.3586 0.534809C15.4223 0.470973 15.498 0.42032 15.5813 0.385749C15.6647 0.351145 15.7541 0.333333 15.8443 0.333333C15.9346 0.333333 16.024 0.351146 16.1074 0.385749L16.2351 0.0778767L16.1074 0.385749C16.1908 0.420353 16.2665 0.471068 16.3302 0.534989L16.3306 0.535313L18.4647 2.66942ZM9.4507 11.7769L9.54614 11.7558L9.61506 11.6865L16.1567 5.10682L16.391 4.87112L16.156 4.6361L14.3702 2.85029L14.1337 2.61378L13.898 2.85108L7.36269 9.43073L7.29616 9.49771L7.27464 9.58964L6.73636 11.8884L6.61554 12.4044L7.13294 12.2899L9.4507 11.7769ZM16.4002 4.39191L16.6352 4.62686L16.8709 4.39266L17.8651 3.40477L18.1023 3.16907L17.8659 2.93261L16.0674 1.13413L15.8294 0.896158L15.5937 1.1364L14.6122 2.13696L14.3809 2.37264L14.6144 2.6061L16.4002 4.39191Z'
        stroke={newColor}
        strokeWidth='0.666667'
      />
    </svg>
  )
}
