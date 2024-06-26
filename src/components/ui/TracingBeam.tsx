import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/components/utils/cn";

export const TracingBeam = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight);
		}
	}, []);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.4], [50, svgHeight]),
		{
			stiffness: 800,
			damping: 50,
		}
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 0.7], [50, svgHeight - 150]),
		{
			stiffness: 800,
			damping: 50,
		}
	);

	return (
		<motion.div
			ref={ref}
			className={cn(
				"relative w-11/12 mx-auto min-h-screen -z-1",
				className
			)}
		>
			<div className="absolute -left-10 md:-left-20 top-3 -z-1">
				<motion.div
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					animate={{
						boxShadow:
							scrollYProgress.get() > 0
								? "none"
								: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
					}}
					className="ml-[27px] h-4 w-4 rounded-full border border-netural-200 shadow-sm flex items-center justify-center"
				>
					<motion.div
						transition={{
							duration: 0.2,
							delay: 0.5,
						}}
						animate={{
							backgroundColor:
								scrollYProgress.get() > 0
									? "#b387fa"
									: "#b387fa",
							borderColor:
								scrollYProgress.get() > 0
									? "#b387fa"
									: "#b387fa",
						}}
						className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
					/>
				</motion.div>
				<svg
					viewBox={`0 0 20 ${svgHeight}`}
					width="20"
					height={svgHeight}
					className=" ml-4 block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.9
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="#9091A0"
						strokeOpacity="0.16"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.9
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="7"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1} // set y1 for gradient
							y2={y2} // set y2 for gradient
						>
							<stop stopColor="#18CCFC" stopOpacity="0"></stop>
							<stop stopColor="#18CCFC"></stop>
							<stop offset="0.325" stopColor="#6344F5"></stop>
							<stop
								offset="1"
								stopColor="#AE48FF"
								stopOpacity="0"
							></stop>
						</motion.linearGradient>
					</defs>
				</svg>
			</div>
			<div ref={contentRef}>{children}</div>
		</motion.div>
	);
};

export default TracingBeam;
