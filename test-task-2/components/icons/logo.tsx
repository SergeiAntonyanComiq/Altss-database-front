const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={40}
    height={40}
    fill="none"
  >
    <rect width={40} height={40} fill="url(#a)" rx={6} />
    <defs>
      <pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT9SURBVHgB7Z09bBRHFMffrE0RiRCUIomUQ7lIbhIUxTSREiH53Bg7TShst0lEyhSxq5SmozIULkFAhwAJaLChYZEQIBpOID4KFyf5kAwFMh8CJDDD/u+86Lw3s7fszjy41ftJgG/28K5/+/btmzdnrSIDldpiTWn68y1RTRFVSciAritSdVL63Er4+9nkVtX5olpbrL7RdDT6skZCbiKpjQFFo41wotEx1qZauzi8rt9e0qS3k+AAtaZVMPogHKu3XuEvRPK6VjdFsmvU2qDSuxDZAV6ua5JI9oLevpGKSe2ond+rtTpDgj+ifB1FdPAHCV5BBRdoTcMk+KYWRbQW0Z7RUb0RkMCCiGZCRDMhopkQ0UyIaCZENBMimgkRzYSIZkJEMyGimRDRTIhoJkQ0EyKaCRHNhIhmQkQzMUiM/Dr8pXXbneWn9PT5G8rDtq2DtHNoW9c4vh++76cAm+ip8W9p/v+frNvnFu7TkdMNygMknzz0S9f4qaUHNHvgNn0KsKUOiE5jz+6vqMywRHTlm89S0wbA9h3R+1ZWXxIXuAqwz06w/+n/bpBrWCK6l+SYyR5R7xpIriT+JMW7gkX0VEaB08yiOfEuOkvayPPefsO76D27vzaOX7jyyDg+VtKbonfR/0x+Zxw/eGzZWDdPj1eojHitOlDfVgw3l2v1x62JxNKVh115GZMPpA+8xzW9anmA410JxzeN4ViKViJeI3qfJZoxkQCnN/5NUsb04VW07cZ2fSNabdNupA9EdpnwJhqSbWkjnpRAMtJHElvvop/xFja22vlUIl0gfZjq55m/huia4xkaTnJn72Pu3x+6rhyc/LmFe4mx11QUb6J7pY2YOH0kf2BENMbydvRMNKMrqfNEz0Yns1v0665gcIGX1IEGUa+0EZOWPqZKVOp5Em2epNgixVZ9lKmj51x0OxLN+fm6pTa2VR9IP2WpPpyLtkWzKW3E2NIHKEv6cC46a7WRpOzpw+l1mdZ9w7a0dukXW7cYxz/GgoAPnIpOa3GilMoLFgTQhOpnnKaOKU+N+zIsCDgT7bNpX4YFAWeibdWGK/q9o+csR9sa/Pisxp3lZ5QV3PhmDPkcHb39C/epX3Ei2tbgB/OWlZQ09k1WuyYqPhcENu9nC/nASeqwNfixLpinKXRyqWkc50gfOKE+ZqNORNtuVBcss71eXLQs3LpeELClNHywJu6HI5W52Gdh0bYGP8grGunBdCW4XhCwfQAS+1g6/Ftr7fDqiREnbYDCom21c960EWNLHzMFJj5J0BbIcow7hz6nojiJaBN5oznGlj7iBQEXYCEgy4zTRQ1fSLStwQ+Kik5LHy47eoej8hPLW82UXkrFQZ4u9L8hYt4QEThoF0tQswdu0Y+GnNxcfbHpNRpOpuO4m/FD6EghOLGIXEy8IBU3wSfRslZz9ZW1j/4hqMrIoibBO/I7LEyIaCZENBMimgkRzYSIZkJEMyGimRDRTIhoJkQ0EyKaCRHNhIhmQkQzIaKZENFMiGgmRDQTgVbUIMEzqh5EIX2ZBK8o0vUgWgI/RoJfVHCu9YTOysjiJZLnzHoBz59duTzxfetmOKjob0VqjQSnwCke8ouvW6LxTNQBFYyKbHe0JQfvn6T8vrxrhGP1AaV3IdRJKIaicKD1UN/2E5TbQwbwHNpo015N6mfS8mDJLKBMjqI2jIqL481wIkxufweX7cAhTfq2vgAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
)

export default Logo
