const marked = require("marked");
const React = require('react')
const ReactDOM = require('react-dom')
const {AppContainer} = require('react-hot-loader')
const {remote} = require('electron')
const fs = require('fs')

const {useState} = React

function App(){
    const [html,setHtml] = useState('')
    const [markdown,setMarkdown] = useState('')
    const renderMarkDownToHtml = (markdown)=>{
      setMarkdown(markdown);
      setHtml(marked(markdown,{
        sanitize: true
      }))
    }
    const getFileFromUser = () => {
      const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
        properties: ["openFile"],
        filters: [
          {
            name: "markdown file",
            extensions: ["md", "markdown"]
          }
        ]
      });
      if (!files) return;
      let content = fs.readFileSync(files[0]).toString();
      renderMarkDownToHtml(content)
    };

    return (
      <div>
        <section className="controns">
          <button>New File</button>
          <button onClick={getFileFromUser}>Open File</button>
          <button disabled>Save File</button>
          <button disabled>Revert</button>
          <button>Save-Html</button>
          <button disabled>Show File</button>
          <button disabled>Open in Default Application</button>
        </section>
        <section className="content">
          <label htmlFor="markdown" hidden>
            Markdown Content
          </label>
          <textarea
            onChange={e => {
              renderMarkDownToHtml(e.target.value);
            }}
            value={markdown}
            className="raw-markdown"
          ></textarea>
          <div
            className="rendered-html"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </section>
      </div>
    );
}

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("root")
);

// const markdownView = document.querySelector('#markdown')
// const htmlView = document.querySelector('#html')
// const newFileButton = document.querySelector('#new-file')
// const openFileButton = document.querySelector("#open-file");
// const saveMarkdownButton = document.querySelector("#save-markdown");
// const revertButton = document.querySelector("#revert");
// const saveHtmlButton = document.querySelector('#save-html')
// const showFileButton = document.querySelector("#show-file");
// const openInDefaultButton = document.querySelector('#open-in-default')

// const renderMarkDownToHtml = (markdown)=>{
//     htmlView.innerHTML = marked(markdown,{
//         sanitize: true
//     });
// }
// markdownView.addEventListener()