import Link from "next/link";

export default function Sections({ sections }: { sections: string[] }) {
  return (
    <div className="my-4 rounded-lg p-2 border border-slate-200">
      <h3 className="font-bold mt-2">سر تیترها</h3>
      <ul className="list-disc mb-2">
        {sections.map((section, index) => (
          <li key={index}>
            <Link href={`#${index}`}>{section}</Link>
          </li>
        ))}
      </ul>
      <p></p>
    </div>
  );
}
