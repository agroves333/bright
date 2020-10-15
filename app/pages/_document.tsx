import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
          <style jsx global>{`
            @import url("//fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");

            body {
              padding: 0;
              margin: 0;
              font-family: "Roboto", -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu,
                Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }

            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              box-sizing: border-box;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
