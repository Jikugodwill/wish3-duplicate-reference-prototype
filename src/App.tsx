import { seedReferences } from './data/seedReferences';
import { ArticleReferenceList } from './components/ArticleReferenceList';
import { NewReferenceForm } from './components/NewReferenceForm';
import './styles/app.css';

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Wikimedia Outreachy Wishlist #3</p>
        <h1>Duplicate Reference Prototype</h1>
        <p className="app-description">
          A standalone interaction demo for checking whether a citation is already in the
          article. Enter URL, DOI, or ISBN and review the suggested action before adding a
          new reference.
        </p>
      </header>

      <section className="app-grid" aria-label="Prototype workspace">
        <div className="panel">
          <h2>Existing References</h2>
          <ArticleReferenceList references={seedReferences} />
        </div>

        <div className="panel">
          <h2>Add New Reference</h2>
          <NewReferenceForm references={seedReferences} />
        </div>
      </section>
    </main>
  );
}

export default App;
