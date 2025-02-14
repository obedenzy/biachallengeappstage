import { useState } from 'react';
import { cityGroups, priorities } from '../lib/utils';

function Register() {
  const [fullName, setFullName] = useState('');
  const [cityGroup, setCityGroup] = useState('');
  const [priority, setPriority] = useState('');
  const [personalGoal, setPersonalGoal] = useState('');
  const [leaderInterest, setLeaderInterest] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!fullName || !cityGroup || !priority || !personalGoal) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          cityGroup,
          priority,
          personalGoal,
          leaderInterest,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitted(true);
        setSubmitMessage(data.message);
        // Reset form fields
        setFullName('');
        setCityGroup('');
        setPriority('');
        setPersonalGoal('');
        setLeaderInterest(false);
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      setFormError('Failed to register. Please try again.');
    }
  };

  const handleInputChange = () => {
    setIsSubmitted(false);
    setFormError('');
    setSubmitMessage('');
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Registration Form</h1>
      {submitMessage && (
        <div className={isSubmitted ? "alert alert-success text-center" : "alert alert-danger"} role="alert">
          {submitMessage}
        </div>
      )}
      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label fw-bold question-label">
            Enter Full Name (First and Last)
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cityGroup" className="form-label fw-bold question-label">
            Select Your &quot;Home&quot; City Group
          </label>
          <select
            className="form-select"
            id="cityGroup"
            value={cityGroup}
            onChange={(e) => {
              setCityGroup(e.target.value);
              handleInputChange();
            }}
            required
          >
            <option value="">Select City</option>
            {cityGroups.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label fw-bold question-label">
            What is your &quot;Top&quot; Priority for the next 30 days?
          </label>
          <select
            className="form-select"
            id="priority"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              handleInputChange();
            }}
            required
          >
            <option value="">Select Priority</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="personalGoal" className="form-label fw-bold question-label">
            Write a personal goal for the month and a plan on how you will accomplish it.
          </label>
          <textarea
            className="form-control"
            id="personalGoal"
            rows="4"
            value={personalGoal}
            onChange={(e) => {
              setPersonalGoal(e.target.value);
              handleInputChange();
            }}
            required
          ></textarea>
          <small className="form-text text-muted">
            &quot;Review your goals twice every day to be focused on achieving them.&quot; – Les Brown
          </small>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="leaderInterest"
            checked={leaderInterest}
            onChange={(e) => {
              setLeaderInterest(e.target.checked);
              handleInputChange();
            }}
          />
          <label className="form-check-label" htmlFor="leaderInterest">
            I completed the first 90 day challenge last year and am interested in helping lead in this new transformational challenge.
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
