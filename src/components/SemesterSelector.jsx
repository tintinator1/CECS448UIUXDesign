const defaultSemesters = ["Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028"];

export default function SemesterSelector({
  value,
  onChange,
  semesters = defaultSemesters,
  label = "Semester",
  className = "",
}) {
  return (
    <div className={`semester-selector-row ${className}`.trim()}>
      <label htmlFor="semester-selector" className="semester-selector-label">
        {label}
      </label>

      <div className="semester-selector-control">
        <select
          id="semester-selector"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="semester-selector-select"
          aria-label="Select semester"
        >
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
        <span className="semester-selector-arrow" aria-hidden="true">
          ›
        </span>
      </div>
    </div>
  );
}
