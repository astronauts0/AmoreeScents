'use client'
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";

export default function TextEditor({ productData, setProductData }) {

    const [openDialog, setOpenDialog] = useState(false);  // Dialog open state

    const handleDialogOpen = () => {
        setOpenDialog(true);  // Open dialog on button click
    };

    const handleDialogClose = () => {
        setOpenDialog(false);  // Close dialog
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div>
            <ReactQuill
                value={productData.description}
                onChange={(value) => setProductData({ ...productData, description: value })}
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder="Write your product description here..."
                className="border border_color"
            />

            <div className="satoshi_medium">
                <div className="w-full flex justify-center items-center mt-4">
                    <div onClick={handleDialogOpen}>
                        <ButtonTextIcon
                            btnType="button"
                            customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                            Icon={<i className="ri-eye-line text-lg"></i>}
                            Text="Show Description Output"
                        />
                    </div>
                </div>
                {openDialog && (
                    <div data-lenis-prevent className="product__description fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-3xl">
                        <div className={`bg-gray-200 shadow_black_1 p-8 rounded-lg max-w-lg w-full overflow-auto h-[85vh]`}>
                            <div className="flex justify-between items-center mt-4">
                                <h2 className="text-2xl font-bold mb-4">Editor Output</h2>
                                <button className="px-4 py-2 bg-gray-600 text-white rounded-md" onClick={handleDialogClose} > <i className="ri-close-line"></i> </button>
                            </div>
                            <div
                                className="p-2 border border_color"
                                dangerouslySetInnerHTML={{ __html: productData.description }}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md"
                                    onClick={handleDialogClose}  // Close the dialog
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
