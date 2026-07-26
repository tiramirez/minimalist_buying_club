import { Fragment, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../utils/validation';

export function UsersInfoForm(props) {
    const { customerInfo, updatecustomerInfo, showMissingInfo, saveInfo, setSaveInfo } = props;
    const [numAdditionalEmails, setNumAdditionalEmails] = useState(0);

    function handleEmailChange(event) {
        const val = event.target.value;
        updatecustomerInfo({ ...customerInfo, email: val, validEmail: !!(val && val.match(isValidEmail)) });
    }

    function handlePhoneChange(event) {
        const val = event.target.value;
        updatecustomerInfo({ ...customerInfo, phone: val, validPhone: !!(val && val.match(isValidPhone)) });
    }

    function handleAdditionalEmailChange(index, val) {
        const newEmails = [...(customerInfo.additionalEmails || [])];
        const newValids = [...(customerInfo.additionalEmailsValid || [])];
        newEmails[index] = val;
        newValids[index] = !!(val && val.match(isValidEmail));
        updatecustomerInfo({ ...customerInfo, additionalEmails: newEmails, additionalEmailsValid: newValids });
    }

    return (
        <>
            <table className="w-full mb-4">
                <tbody>
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">First Name:</td>
                        <td>
                            <input
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.firstName}
                                onChange={(e) => updatecustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                type="text"
                                required
                            />
                        </td>
                    </tr>
                    {!customerInfo.lastName && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! Last Name is required</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Last Name:</td>
                        <td>
                            <input
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.lastName}
                                onChange={(e) => updatecustomerInfo({ ...customerInfo, lastName: e.target.value })}
                                type="text"
                                required
                            />
                        </td>
                    </tr>
                    {!customerInfo.validEmail && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! Missing or Invalid Email</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Email:</td>
                        <td>
                            <input
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.email}
                                onChange={handleEmailChange}
                                type="email"
                                placeholder="your@email.com"
                                required
                            />
                        </td>
                    </tr>
                    {Array.from({ length: numAdditionalEmails }).map((_, i) => (
                        <Fragment key={i}>
                            {customerInfo.additionalEmails?.[i] && !customerInfo.additionalEmailsValid?.[i] && showMissingInfo &&
                                <tr><td></td><td><p className="font-bold text-red-500">!! Invalid Email</p></td></tr>
                            }
                            <tr>
                                <td className="md:py-1 font-semibold text-sm md:text-base">CC Email:</td>
                                <td>
                                    <input
                                        className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                        value={customerInfo.additionalEmails?.[i] || ""}
                                        onChange={(e) => handleAdditionalEmailChange(i, e.target.value)}
                                        type="email"
                                        placeholder="another@email.com"
                                    />
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                    {numAdditionalEmails < 3 &&
                        <tr>
                            <td></td>
                            <td>
                                <button
                                    type="button"
                                    className="text-sm text-brand-rose hover:underline mt-1"
                                    onClick={() => setNumAdditionalEmails(n => n + 1)}
                                >
                                    + Add another email
                                </button>
                            </td>
                        </tr>
                    }
                    {!customerInfo.validPhone && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! Missing or Invalid Phone</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Phone:</td>
                        <td>
                            <input
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.phone}
                                onChange={handlePhoneChange}
                                type="tel"
                                placeholder="(123)4567890"
                                required
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex items-center gap-2 mb-4">
                <input
                    id="save-info"
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="rounded border-gray-300"
                />
                <label htmlFor="save-info" className="text-sm text-brand-warm-gray cursor-pointer">
                    Remember my info for next time
                </label>
            </div>
        </>
    );
}
