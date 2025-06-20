import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Create = ({ uploadToPinata, createFund }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            const uploadedFile = acceptedFiles[0];
            setFile(uploadedFile);
        },
    });

    const clearForm = () => {
        setFile(null);
        setName('');
        setDescription('');
        setTargetAmount('');
        setDeadline('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!file || !name || !description || !targetAmount || !deadline) {
            alert('Please fill in all required fields and select an image.');
            return;
        }

        setIsCreating(true);

        try {
            const unixTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
            // Convert to nanoseconds as required by some blockchain contexts
            const deadlineNanoseconds = BigInt(unixTimestamp) * BigInt(1_000_000_000); 

            const imageIpfsHash = await uploadToPinata(file);

            await createFund(imageIpfsHash, name, description, targetAmount, deadlineNanoseconds);
            alert('Fund created successfully!');
            clearForm(); // Clear form fields after successful creation
        } catch (error) {
            console.error('Error creating fund:', error);
            alert('Failed to create fund. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white pt-15 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-800 rounded-lg shadow-xl p-8">
                {/* Image Upload Section */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/3 p-4 bg-gray-700 rounded-lg mb-6 md:mb-0 md:mr-6">
                    <div
                        {...getRootProps({ className: 'border-2 border-dashed border-purple-500 rounded-lg p-6 text-center w-full cursor-pointer' })}
                    >
                        <input {...getInputProps()} />
                        {file ? (
                            <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-full h-auto rounded-lg mb-4 mx-auto" />
                        ) : (
                            <p className="text-purple-300">Drag & drop an image here, or click to select one</p>
                        )}
                    </div>
                    {file && (
                        <button
                            onClick={() => setFile(null)}
                            className="bg-red-600 text-white rounded-lg px-6 py-2 mt-4 hover:bg-red-700 transition-colors"
                        >
                            Clear Image
                        </button>
                    )}
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-2/3 p-4">
                    <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-400">Create Your New Fund</h2>

                    <div className="mb-6">
                        <label htmlFor="title" className="block text-lg font-medium mb-2">Fund Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., 'Save the Amazon Rainforest'"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-lg font-medium mb-2">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about your fund and its purpose..."
                            rows="5"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="targetAmount" className="block text-lg font-medium mb-2">Target Amount (ETH):</label>
                        <input
                            type="number"
                            id="targetAmount"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            placeholder="e.g., 10 (in ETH)"
                            min="0"
                            step="any"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="deadline" className="block text-lg font-medium mb-2">Funding Deadline:</label>
                        <input
                            type="datetime-local"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className={`bg-purple-600 text-white font-bold rounded-full px-10 py-4 text-xl tracking-wide 
                                ${isCreating ? 'opacity-60 cursor-not-allowed' : 'hover:bg-purple-700 transform hover:scale-105 transition-all duration-300'}`}
                        >
                            {isCreating ? 'Creating Fund...' : 'Launch Fund'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;