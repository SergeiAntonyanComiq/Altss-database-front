const Hamburger = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#637381"
        fillOpacity={0.75}
        d="M20.4.675H3.6A2.969 2.969 0 0 0 .637 3.637v16.8c0 1.613 1.313 2.925 2.963 2.925h16.8a2.929 2.929 0 0 0 2.925-2.924V3.6A2.929 2.929 0 0 0 20.4.675ZM2.325 20.4V3.6c0-.675.562-1.275 1.275-1.275h3v19.313h-3c-.675.037-1.275-.563-1.275-1.238Zm19.35 0c0 .675-.563 1.238-1.238 1.238H8.287V2.325H20.4c.675 0 1.238.563 1.238 1.275v16.8h.037Z"
      />
      <path fill="#87939E" d="M3 5h2v1H3zM3 7h2v1H3z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default Hamburger
