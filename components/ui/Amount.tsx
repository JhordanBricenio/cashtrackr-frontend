import { formatCurrency } from "@/src/utils";

type AmonuntProps = {
    label: string;
    amount: number;
}

export default function Amount({ label, amount }: AmonuntProps) {
  return (
    <p className=" text-2xl font-bold">
        {label} : {' '}
        <span className=" text-amber-500"> {formatCurrency( amount)}</span>
    </p>
  )
}
