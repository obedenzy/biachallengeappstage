import { useState } from 'react';

    function Register() {
      const [fullName, setFullName] = useState('');
      const [cityGroup, setCityGroup] = useState('');
      const [priority, setPriority] = useState('');
      const [personalGoal, setPersonalGoal] = useState('');
      const [leaderInterest, setLeaderInterest] = useState(false);
      const [formError, setFormError] = useState('');
      const [isSubmitted, setIsSubmitted] = useState(false);

      const cityGroups = [
        'Atlanta, GA',
        'Austin, TX',
        'Baltimore/DC',
        'Boston (New England)',
        'Chicago, IL',
        'Cincinnati, OH',
        'Cleveland, OH',
        'Columbus, OH',
        'Conneticut / West Mass.',
        'Dallas/Ft. Worth',
        'Denver, CO',
        'Detroit, MI',
        'Fort Myers/Cape Coral, FL',
        'Honolulu, HI',
        'Houston, TX',
        'Hunstville, AL',
        'Indianapolis, IN',
        'Jacksonville, FL',
        'Kansas City, MO',
        'Las Vegas, NV',
        'Lexington, KY',
        'Los Angeles, CA',
        'Miami/West Palm Beach, FL',
        'Milwaukee, WI',
        'Nashville, TN',
        'New York City, NY',
        'North Carolina',
        'Oklahoma',
        'Orlando, FL',
        'Philadelphia, PA',
        'Phoenix, AZ',
        'Pittsburgh, PA',
        'Richmond, VA',
        'San Antonio, TX',
        'San Diego, CA',
        'San Francisco/San Jose, CA',
        'Seattle, WA',
        'South Carolina',
        'St. Louis, MO',
        'Tampa, FL',
        'West Virginia'
      ];

      const priorities = [
        'Weight Loss',
        'Mental Health/Mindset',
        'Healthy Mindful Eating',
        'Working Out/Movement',
        'Discipline/Consistency/Sustainability'
      ];

      const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError('');
        setIsSubmitted(false);

        if (!fullName || !cityGroup || !priority || !personalGoal) {
          setFormError('Please fill in all required fields.');
          return;
        }

        const formData = {
          formType: 'registration',
          fullName,
          cityGroup,
          priority,
          personalGoal,
          leaderInterest
        };

        try {
          const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log('Registration data submitted successfully');
            setIsSubmitted(true);
            // Reset form fields
            setFullName('');
            setCityGroup('');
            setPriority('');
            setPersonalGoal('');
            setLeaderInterest(false);
          } else {
            const errorData = await response.json();
            console.error('Registration form submission error:', errorData);
            setFormError('Failed to submit registration. Please try again.');
          }
        } catch (error) {
          console.error('Network error on registration form submission:', error);
          setFormError('Network error. Please check your connection.');
        }
      };

      const handleInputChange = () => {
        setIsSubmitted(false);
        setFormError('');
      };

      return (
        <div className="container">
          <h1 className="text-center mb-4">Registration Form</h1>
          {isSubmitted && (
            <div className="alert alert-success text-center" role="alert">
              Thank you for registering!
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
