type Props = {
    className?: string;
};

function SearchIcon({ className }: Props) {
    return (
        <div className={className}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.75 15.7501L12.525 12.5251M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
                    stroke="#768294"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export default SearchIcon;
