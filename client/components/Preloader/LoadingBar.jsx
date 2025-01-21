import React from 'react';

const LoadingBar = ({ loadingBarRef }) => {

    return (
        <div ref={loadingBarRef} className='flex justify-center items-center h-full w-full relative z-50'>
            <svg className='font-bold' xmlns="http://www.w3.org/2000/svg" width="320" height="100" viewBox="0 0 400 200">
                <defs>
                    <mask id="theMask">
                        <rect id="maskerH" width="400" height="200" x="-400" y="0" fill="#fff" />
                        <rect id="maskerV" width="400" height="200" x="0" y="200" fill="#fff" />
                    </mask>
                </defs>

                {/* Background rectangle with transparent fill and white border */}
                <rect id="bgFixed" width="400" height="200" fill="none" stroke="white" strokeWidth="4" />

                {/* Text with white color */}
                <g id="startColor" fill="#fff" fontSize="100">
                    <text className="theCount obviously" textAnchor="end" x="220" y="140">0</text>
                    <text className="obviously" textAnchor="start" x="230" y="140">%</text>
                </g>

                {/* Masked area */}
                <g mask="url(#theMask)">
                    <rect id="bgChange" width="400" height="200" fill="#fff" />

                    <g id="end" fill="#000" fontSize="100">
                        <text className="theCount obviously" textAnchor="end" x="220" y="140">0</text>
                        <text className="obviously" textAnchor="start" x="230" y="140">%</text>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default LoadingBar;