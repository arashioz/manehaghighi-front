import { numberSeparator, persianNumber } from "@/lib/utils";
import { Course } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course }: { course: Course }) {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-[400px]">
			<Link href={`/courses/${course.enTitle}`}>
				<Image
					className="h-[200px] w-full object-contain object-center"
					width={720}
					height={200}
					src={course.hero}
					alt={course.title}
				/>
				<div className="flex flex-col justify-between gap-2 h-[200px]">
					<div className="p-4">
						<h2 className="text-center text-2xl font-bold text-gray-800">
							{course.title}
						</h2>
					</div>
					<p className="-mt-2 text-center text-lg font-semibold">
						{persianNumber(numberSeparator(course.price))} تومان
					</p>
					<Link
						href={`/courses/${course.enTitle}`}
						className="flex items-center justify-center rounded rounded-t-none bg-purple-600 px-3 py-3 text-xs font-medium uppercase text-white"
					>
						<span className="w-full text-center text-lg font-semibold">
							مشاهده جزئیات
						</span>
					</Link>
				</div>
			</Link>
		</div>
	);
}
