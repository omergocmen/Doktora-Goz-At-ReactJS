import { Link } from "react-router-dom";

export default function LinkIcon({ children, ...props }) {
    return (
        <Link {...props} to={props.to} className={`bg-slate-700 py-[7.5px] px-[7.5px] text-[16px] text-white font-semibold rounded-3xl shadow-xl cursor-pointer transition-all outline-none ${props.className}`}>
            {children}
        </Link>
    );
}