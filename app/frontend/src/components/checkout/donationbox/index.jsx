import { useState, useMemo } from "react"

const isNumeric = /^\$?(500(\.00?)?|[1-4]?\d{1,2}(\.\d{1,2})?)$/g;

export function DonationBox(props) {
    const { selectedDonation, updateSelectedDonation, donationProps } = props
    const [customDonation, updateCustomDonation] = useState(0.0);
    const [isCustomDonation, setIsCustomDonation] = useState(false)
    const [isValidCustomDonation, updateIsValidCustomDonation] = useState(false);

    const donation = useMemo(()=>{
        return isCustomDonation ? customDonation : selectedDonation;
    },[selectedDonation,customDonation,isCustomDonation])

    const handleClickDonation = (value) => {
        setIsCustomDonation(false);
        updateSelectedDonation(value);
    }

    const handleClickOther = () => {
        setIsCustomDonation(true)
        updateSelectedDonation(customDonation);
    }
    
    const handleCustomDonationChange = (event) => {
        if (event.target?.value && event.target.value.match(isNumeric)) {
            updateSelectedDonation(parseFloat(event.target.value));
            updateCustomDonation(parseFloat(event.target.value));
            updateIsValidCustomDonation(true)
        } else {
            updateIsValidCustomDonation(false)
        }
    }

    return (
        <div className="pb-4">
            <h4 className="text-lg font-semibold mb-2">{donationProps.title}</h4>
            <p>{donationProps.description}</p>
            <div className="flex space-x-2 mt-4 pl-1 py-1 overflow-x-scroll">
                {donationProps.donationOptions.map((item) =>  
                    <button
                        key={item.label}
                        className={(donation === item.value && !isCustomDonation ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"}
                        onClick={() => handleClickDonation(item.value)}
                    >{item.label}</button>
                )}
                <button
                    id="donation-other"
                    className={(isCustomDonation ? "ring bg-violet-300 ring-violet-700" : "bg-gray-200 hover:bg-gray-300") + " text-gray-700 md:py-1 px-4 rounded cursor-pointer"}
                    onClick={handleClickOther}
                >Other</button>
                <input
                    onChange={handleCustomDonationChange}
                    placeholder="0.00"
                    className={(isCustomDonation ? "ring ring-violet-700" : "border border-gray-300") + "bg-white-200 w-20 px-1 py-3/4 rounded"}
                    row="1"
                    disabled={!isCustomDonation}
                />
            </div>
            {!isValidCustomDonation && isCustomDonation ? <p className="font-bold text-red-500">You can donate up to $500</p> : <></>}
        </div>
    )
}