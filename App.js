/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import RNFileSelector from 'react-native-file-selector';
import SignatureCapture from "react-native-signature-capture";
import Pdf from "react-native-pdf";
import PDFLib, { PDFDocument, PDFPage } from "react-native-pdf-lib";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { captureRef } from "react-native-view-shot";

const { width } = Dimensions.get('window');
var RNFS = require('react-native-fs');

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    signature: null,
    loading: false,
    source: '/data/user/0/com.signature_pdf_gesture/files/sample.pdf'
  };
  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    console.log('pencet')
    this.refs["sign"].resetImage();

  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  addFile2 = async () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()],
    }, async (error, res) => {

      // Android
      // const a = await this.getBase64(res)
      // this.setState({
      //   source: res.uri
      // })
      console.log({
        uri: res.uri,
        type: res.type, // mime type
        fileName: res.fileName,
        size: res.fileSize,
        // a
      });

      this.copyFile(res.uri)

      // const docsDir = await PDFLib.getDocumentsDirectory();

      // RNFS.copyFile(res.uri, docsDir)
      //   .then(result => {
      //     console.log({ result })
      //   })
      //   .catch(err => {
      //     console.log({ err })
      //   })
    });
  }

  copyFile = async (path) => {
    console.log('mlebu rene')
    // this.getBase64(path)
    console.log({ path })
    RNFS.stat(path)
      .then(res => {
        console.log({ res })
        const { originalFilepath } = res
        this.setState({
          source: originalFilepath
        })
      })
      .catch(err => {
        console.log({ err })
      })

    // RNFS.readDirAssets(path)
    //   .then(res => {
    //     console.log({ res })
    //   })
    //   .catch(err => {
    //     console.log({ err })
    //   })
    // const docsDir = RNFS.DocumentDirectoryPath + '/test.txt';
    // // const docsDir = await PDFLib.getDocumentsDirectory();
    // console.log({ path, docsDir })
    // RNFS.copyFileAssets(path, docsDir)
    //   .then(result => {
    //     console.log({ result })
    //   })
    //   .catch(err => {
    //     console.log({ err })
    //   })

    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       title: 'Title',
    //       message: ' Access your files',
    //     }
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     RNFileSelector.Show({
    //       title: 'Select File',
    //       onDone: path => {
    //         console.log({ path });
    //         this.copyFile(path)
    //         this.setState({
    //           source: path
    //         })

    //         // this.props.navigation.navigate('LoanUploadPreview');
    //       },
    //       onCancel: () => {
    //         alert('cancelled');
    //       },
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  addFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Title',
          message: ' Access your files',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNFileSelector.Show({
          title: 'Select File',
          onDone: path => {
            console.log({ path });

            this.copyFile(path)


            // this.props.navigation.navigate('LoanUploadPreview');
          },
          onCancel: () => {
            alert('cancelled');
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  _onSaveEvent = async result => {
    this.setState({ loading: true })
    // console.log(this);
    // captureRef(this.refs[refname], this.state.value)
    // const uri = await captureRef(this.refs.viewShot, {
    //   format: "png",
    //   quality: 0.8
    // })
    //   .then(
    //     uri => Promise.resolve(uri),
    //     error => console.error("Oops, snapshot failed", error)
    //   );
    // console.log({ uri })

    // return;
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
    // this.setState({
    //   signature: result.encoded
    // });

    // var path = RNFS.DocumentDirectoryPath + '/test.txt';

    // write the file
    // RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    //   .then((success) => {
    //     console.log('FILE WRITTEN!');
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then((result) => {
    //     console.log('GOT RESULT', result);

    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //   })
    //   .then((statResult) => {
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'utf8');
    //     }

    //     return 'no file';
    //   })
    //   .then((contents) => {
    //     // log the file contents
    //     console.log({ contents });
    //   })
    //   .catch((err) => {
    //     console.log(err.message, err.code);
    //   });

    // return

    // const path = `data:image/png;base64,${result.encoded}`;
    // const page2 = PDFPage.modify(1)
    //   .drawText("You can add images to modified pages too!")
    //   .drawImage(path, "png", {
    //     x: 5,
    //     y: 25,
    //     width: 200,
    //     height: 100
    //   });
    // const existingPDF = this.state.source;
    // const docsDir = await PDFLib.getDocumentsDirectory();
    // console.log({ docsDir })
    // PDFDocument.modify(existingPDF)
    //   .modifyPages(page2)
    //   .write() // Returns a promise that resolves with the PDF's path
    //   .then(path => {
    //     console.log("PDF modified at: " + path);
    //   });

    // const page1 = PDFPage
    //   .create()
    //   .setMediaBox(200, 200)
    //   .drawText('You can add text and rectangles to the PDF!', {
    //     x: 5,
    //     y: 235,
    //     color: '#007386',
    //   })
    //   .drawRectangle({
    //     x: 25,
    //     y: 25,
    //     width: 150,
    //     height: 150,
    //     color: '#FF99CC',
    //   })
    //   .drawRectangle({
    //     x: 75,
    //     y: 75,
    //     width: 50,
    //     height: 50,
    //     color: '#99FFCC',
    //   });

    // works
    const docsDir = await PDFLib.getDocumentsDirectory();
    const base64Image = result.encoded;
    const imagePath = `${docsDir}/logo.png`

    await RNFS.writeFile(imagePath, base64Image, 'base64');
    // Create a PDF page with text and images
    // const page2 = PDFPage
    //   .modify(0)
    //   .drawImage(imagePath, 'png', {
    //     x: 150,
    //     y: 25,
    //     width: 50,
    //     height: 25,
    //   });

    // const page3 = PDFPage
    //   .modify(1)
    //   .drawImage(imagePath, 'png', {
    //     x: 150,
    //     y: 25,
    //     width: 50,
    //     height: 25,
    //   })

    const checkedPage = [1, 2]
    const pages = []

    checkedPage.map((item) => {
      const index = item - 1;
      const page = PDFPage
        .modify(index)
        .drawImage(imagePath, 'png', {
          x: 150,
          y: 25,
          width: 50,
          height: 25,
        })
      pages.push(page)
    })

    // const page1 = PDFPage
    //   .create()
    //   .setMediaBox(50, 50)
    //   .drawText('You can add JPG images too!')
    //   .drawImage(imagePath, 'png', {
    //     x: 5,
    //     y: 125,
    //     width: 200,
    //     height: 100
    //   })

    // Create a new PDF in your app's private Documents directory
    // const docsDir = await PDFLib.getDocumentsDirectory();
    console.log({ docsDir })
    // const pdfPath = `${docsDir}/sample.pdf`;
    const pdfPath = this.state.source
    // const pdfPath = 'file:///storage/emulated/0/Download/'
    console.log({ pdfPath })
    PDFDocument.modify(pdfPath)
      .modifyPages(...pages)
      // .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log('PDF created at: ' + path);
        // Do stuff with your shiny new PDF!
        this.setState({
          source: pdfPath,
          loading: false
        })
      }).catch(error => console.log({ error }));

    // works
    // const page1 = PDFPage
    //   .create()
    //   .setMediaBox(250, 250)
    //   .drawText('You can add JPG images too!')
    // // .drawImage(result.encoded, 'png', {
    // //   x: 5,
    // //   y: 125,
    // //   width: 200,
    // //   height: 100
    // // })

    // // Create a new PDF in your app's private Documents directory
    // const docsDir = await PDFLib.getDocumentsDirectory()
    // const pdfPath = `${docsDir}/sample.pdf`
    // console.log(pdfPath)
    // PDFDocument
    //   .create(pdfPath)
    //   .addPages(page1)
    //   .write() // Returns a promise that resolves with the PDF's path
    //   .then(path => {
    //     console.log('PDF created at: ' + path)
    //     // Do stuff with your shiny new PDF!
    //   })
  };
  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log("dragged");
  }
  render() {
    const { signature } = this.state;
    const source = {
      uri: this.state.source,
      cache: true
    };
    const path = `data:image/png;base64,${signature}`;
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ alignItems: "center", justifyContent: "center" }}>
          Signature Capture Extended{" "}
        </Text>
        <View ref="viewShot" style={[{ flex: 1 }, styles.signature]}>
          <SignatureCapture
            style={[styles.signature]}
            ref="sign"
            onSaveEvent={this._onSaveEvent}
            onDragEvent={this._onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={"portrait"}
          />
        </View>


        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => {
              this.saveSign();
            }}
          >
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => {
              this.resetSign();
            }}
          >
            <Text>Reset</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => {
              this.addFile();
            }}
          >
            <Text>add file</Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{ flex: 1, borderWidth: 1 }}>
          {!signature ? null : (
            <Image
              source={{
                uri: path
              }}
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
            />
          )}
        </View> */}
        <View style={{ flex: 5 }}>
          {
            this.state.loading ? <ActivityIndicator /> :
              <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                style={styles.pdf}
              />
          }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  signature: {
    // flex: 1,
    height: 100,
    width: 200,
    borderColor: "#000033",
    borderWidth: 1
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }
});
