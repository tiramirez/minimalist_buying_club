import { Fragment, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import { getNameProblem } from '../../utils/customerInfo';

export function UsersInfoForm(props) {
    const { customerInfo, updatecustomerInfo, showMissingInfo, saveInfo, setSaveInfo, needsReentry, overwriteSaved, setOverwriteSaved } = props;
    const [numAdditionalEmails, setNumAdditionalEmails] = useState(0);
    const nameProblem = getNameProblem(customerInfo);

    // Functional updates: autofill fires several onChange events in one tick,
    // and spreading a stale customerInfo would drop all but the last field.
    function handleFirstNameChange(event) {
        const val = event.target.value;
        updatecustomerInfo(prev => ({ ...prev, firstName: val }));
    }

    function handleLastNameChange(event) {
        const val = event.target.value;
        updatecustomerInfo(prev => ({ ...prev, lastName: val }));
    }

    function handleEmailChange(event) {
        const val = event.target.value;
        updatecustomerInfo(prev => ({ ...prev, email: val, validEmail: !!(val && val.match(isValidEmail)) }));
    }

    function handlePhoneChange(event) {
        const val = event.target.value;
        updatecustomerInfo(prev => ({ ...prev, phone: val, validPhone: !!(val && val.match(isValidPhone)) }));
    }

    function handleAdditionalEmailChange(index, val) {
        updatecustomerInfo(prev => {
            const newEmails = [...(prev.additionalEmails || [])];
            const newValids = [...(prev.additionalEmailsValid || [])];
            newEmails[index] = val;
            newValids[index] = !!(val && val.match(isValidEmail));
            return { ...prev, additionalEmails: newEmails, additionalEmailsValid: newValids };
        });
    }

    return (
        <>
            {needsReentry &&
                <p className="mb-3 p-2 rounded bg-brand-cream text-sm text-brand-text-primary">
                    Your saved name looks incomplete. Please re-enter your first and last name.
                </p>
            }
            <table className="w-full mb-4">
                <tbody>
                    {nameProblem === 'missing_first' && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! First Name is required</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base"><label htmlFor="checkout-first-name">First Name:</label></td>
                        <td>
                            <input
                                id="checkout-first-name"
                                name="given-name"
                                autoComplete="given-name"
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.firstName}
                                onChange={handleFirstNameChange}
                                type="text"
                                required
                            />
                        </td>
                    </tr>
                    {nameProblem === 'missing_last' && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! Last Name is required</p></td></tr>
                    }
                    {nameProblem === 'same' && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! First and last name can't be the same</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base"><label htmlFor="checkout-last-name">Last Name:</label></td>
                        <td>
                            <input
                                id="checkout-last-name"
                                name="family-name"
                                autoComplete="family-name"
                                className="w-full px-1 py-3/4 border border-gray-300 rounded"
                                value={customerInfo.lastName}
                                onChange={handleLastNameChange}
                                type="text"
                                required
                            />
                        </td>
                    </tr>
                    {!customerInfo.validEmail && showMissingInfo &&
                        <tr><td></td><td><p className="font-bold text-red-500">!! Missing or Invalid Email</p></td></tr>
                    }
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base"><label htmlFor="checkout-email">Email:</label></td>
                        <td>
                            <input
                                id="checkout-email"
                                name="email"
                                autoComplete="email"
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
                        <td className="md:py-1 font-semibold text-sm md:text-base"><label htmlFor="checkout-phone">Phone:</label></td>
                        <td>
                            <input
                                id="checkout-phone"
                                name="tel"
                                autoComplete="tel"
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
            {needsReentry ? (
                !nameProblem &&
                <div className="mb-4">
                    {overwriteSaved === null && showMissingInfo &&
                        <p className="font-bold text-red-500">!! Please choose an option</p>
                    }
                    <p className="text-sm text-brand-text-primary mb-2">
                        Update your saved info on this device with these details?
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={`px-3 py-1 rounded border text-sm ${overwriteSaved === true ? 'bg-brand-rose text-white border-brand-rose' : 'bg-white border-brand-border text-brand-text-primary'}`}
                            onClick={() => setOverwriteSaved(true)}
                        >
                            Yes, update
                        </button>
                        <button
                            type="button"
                            className={`px-3 py-1 rounded border text-sm ${overwriteSaved === false ? 'bg-brand-rose text-white border-brand-rose' : 'bg-white border-brand-border text-brand-text-primary'}`}
                            onClick={() => setOverwriteSaved(false)}
                        >
                            No, only for this order
                        </button>
                    </div>
                </div>
            ) : (
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
            )}
        </>
    );
}
