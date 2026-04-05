import { FormEvent } from 'react';

export function NewReferenceForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Placeholder behavior only; duplicate detection is intentionally not wired yet.
    event.preventDefault();
  };

  return (
    <form className="new-reference-form" onSubmit={handleSubmit}>
      <label htmlFor="new-reference-title">Title</label>
      <input id="new-reference-title" name="title" type="text" placeholder="Reference title" />

      <label htmlFor="new-reference-url">URL</label>
      <input
        id="new-reference-url"
        name="url"
        type="url"
        placeholder="https://example.org/article"
      />

      <label htmlFor="new-reference-doi">DOI</label>
      <input id="new-reference-doi" name="doi" type="text" placeholder="10.xxxx/xxxxx" />

      <label htmlFor="new-reference-isbn">ISBN</label>
      <input id="new-reference-isbn" name="isbn" type="text" placeholder="978-0-00-000000-0" />

      <button type="submit">Check for duplicate (coming next)</button>
    </form>
  );
}
