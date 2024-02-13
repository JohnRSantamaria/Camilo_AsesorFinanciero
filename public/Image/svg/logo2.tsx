import React from 'react';

interface svgPropsInterface {
	className?: string;
	stopColor?: string;
}

const Logo: React.FC<svgPropsInterface> = ({className}) => {
	return (
		<svg
			version='1.0'
			xmlns='http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'
			width='2035.000000pt'
			height='2348.000000pt'
			viewBox='0 0 2035.000000 2348.000000'
			preserveAspectRatio='xMidYMid meet'
			className={`${className} bg-transparent`}
			zoomAndPan='magnify'
		>
			<g
				transform='translate(0.000000,2348.000000) scale(0.100000,-0.100000)'
				fill='#c29739'
				stroke='none'
			>
				<path
					d='M5040 20541 l-5035 -2928 -3 -5789 -2 -5790 5036 -3009 c2770 -1656
5042 -3011 5049 -3013 13 -3 10211 5825 10248 5856 16 14 17 308 15 5960 l-3
5945 -5120 2848 c-2816 1567 -5127 2849 -5135 2848 -8 0 -2281 -1317 -5050
-2928z m9948 -499 l4862 -2597 0 -5705 0 -5705 -1207 -725 c-664 -399 -1210
-726 -1215 -728 -4 -2 -8 2598 -8 5777 l0 5781 -735 490 -735 490 -2 -6601 -3
-6601 -1050 -648 -1050 -647 -7 136 c-4 75 -41 3536 -83 7691 -42 4155 -78
7614 -81 7685 l-6 130 -720 480 c-396 264 -725 481 -732 483 -9 2 -11 -39 -8
-160 39 -1889 319 -17265 314 -17270 -13 -12 -2424 -1459 -2427 -1456 -1 2 33
2203 75 4893 43 2690 80 4997 82 5128 l3 237 -1222 0 -1223 0 -2 -3093 -3
-3094 -2595 1462 -2595 1462 0 4322 0 4323 2598 1463 2597 1463 0 -3014 0
-3014 1223 0 1223 0 -3 168 c-2 92 -37 2206 -78 4697 -41 2492 -76 4615 -79
4718 -4 173 -3 188 12 182 9 -3 2205 -1175 4880 -2603z'
				/>
			</g>
		</svg>
	);
};
export default Logo;