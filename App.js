import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';

class App extends Component {
  constructor(){
    super();
    this.state = {
      positif: '',
      sembuh: '',
      meninggal: '',
      positifI: '',
      sembuhI: '',
      meninggalI: '',
      perawatanI: '',
      data: [],
      refresh: false,
    }
  }

  componentDidMount = async () =>{
    this.setState({refresh: true})
    await fetch('https://covid19.mathdro.id/api')
    .then(response => response.json())
        .then(json => (
            this.setState({positif: json.confirmed.value}),
            this.setState({sembuh: json.recovered.value}),
            this.setState({meninggal: json.deaths.value})
        )
      )
    await fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
      .then(response => response.json())
      .then(json => this.setState({data: json.data}))
    await fetch('https://kawalcovid19.harippe.id/api/summary')
      .then(response => response.json())
      .then(json => (
          this.setState({positifI: json.confirmed.value}),
          this.setState({sembuhI: json.recovered.value}),
          this.setState({meninggalI: json.deaths.value}),
          this.setState({perawatanI: json.activeCare.value}),
          this.setState({refresh: false})
      )
    )
  }
  
  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 8, marginBottom: 30 }}>
        <View style={{ flex: 1, marginTop: 50, marginBottom: 20 }}>
          <Text style={{ alignSelf: "center", fontSize: 21, fontWeight:"bold" }}>Data COVID-19 Global & Indonesia</Text>
        </View>
  
        <View style={{ flex: 5, marginBottom: 30 }}>
          <View style={{ marginTop: 10, marginBottom: 10, flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", marginRight: 5 }}>Global</Text>
            <Image source={require('./assets/globe.png')} style={{ height: 20, width: 20, marginTop: 5 }} />
          </View>
          <View style={{ flex: 1, flexDirection:"row", justifyContent: "center" }}>
            <View style={{ flex: 1, height: 90, width: 100, backgroundColor: "#ffe505", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Positif</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.positif}</Text>
            </View>
            <View style={{ flex: 1, marginHorizontal: 10, height: 90, width: 100, backgroundColor: "#05ff81", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Sembuh</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.sembuh}</Text>
            </View>
            <View style={{ flex: 1, height: 90, width: 100, backgroundColor: "#ff4141", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Meninggal</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.meninggal}</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: "#e7e7e7", marginTop: 25, marginHorizontal: 15, flex: 1, height: 35, justifyContent: "center", borderRadius: 6, borderWidth: 0.7 }}>
            <Text style={{ alignSelf: "center" }}>Indonesia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 25, marginHorizontal: 15, flex: 1, height: 35, justifyContent: "center", borderRadius: 6, borderWidth: 0.7 }}>
            <Text style={{ alignSelf: "center" }}>RS Rujukan</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ flex: 15, marginTop: 35, marginBottom: 10 }}>

          <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", marginRight: 10 }}>Indonesia</Text>
            <Image source={require('./assets/indo1.png')} style={{ height: 20, width: 20, marginTop: 5 }} />
          </View>

          <View style={{ flex: 3, flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#ffe505", marginBottom: 10, justifyContent: "center", marginHorizontal: 6, height: 50, borderWidth: 0.6, borderRadius: 6 }}>
              <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 10 }}>Positif</Text>
              <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>{this.state.positifI}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#05ff81", marginBottom: 10, justifyContent: "center", marginHorizontal: 6, height: 50, borderWidth: 0.6, borderRadius: 6 }}>
              <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 10 }}>Sembuh</Text>
              <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>{this.state.sembuhI}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#ff4141", marginBottom: 10, justifyContent: "center", marginHorizontal: 6, height: 50, borderWidth: 0.6, borderRadius: 6 }}>
              <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 10 }}>Meninggal</Text>
              <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>{this.state.meninggalI}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#7ba4ff", marginBottom: 10, justifyContent: "center", marginHorizontal: 6, height: 50, borderWidth: 0.6, borderRadius: 6 }}>
              <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 10 }}>Perawatan</Text>
              <Text style={{ fontWeight: "bold", alignSelf: "center", fontSize: 12 }}>{this.state.perawatanI}</Text>
            </View>
          </View>

        <View style={{ flex: 5 }}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.fid.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 6, marginBottom: 4, height: 40, justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ marginLeft: 4 }}>{item.provinsi}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
                  <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffe505", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
                    <Text style={{ alignSelf: "center" }}>{item.kasusPosi}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#05ff81", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
                    <Text style={{ alignSelf: "center" }}>{item.kasusSemb}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#ff4141", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
                    <Text style={{ alignSelf: "center" }}>{item.kasusMeni}</Text>
                  </View>
                </View>
              </View>
            )
          }
          refreshing={this.state.refresh}
          onRefresh={this.componentDidMount}
          />
        </View>
      </View>

      <View style={{ flex: 9, marginBottom: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold"}}>Rumah Sakit Rujukan (Sulut)</Text>
          </View>
        <View>
          <ScrollView>
            <View>
              <View style={{ borderWidth: 0.8, borderRadius: 4, marginBottom: 2 }}>
                <Text>RSUP Prof Dr R Kandou, Manado.</Text>
                <Text>Telp : (0431) 8383058</Text>
              </View>
            </View>
            <View style={{ borderWidth: 0.8, borderRadius: 4, marginBottom: 2 }}>
                <Text>RSU Ratatotok, Buyat.</Text>
                <Text>Telp : (0431) 3177610</Text>
            </View>
            <View style={{ borderWidth: 0.8, borderRadius: 4, marginBottom: 2 }}>
                <Text>RSUD Dr Sam Ratulangi, Luaan, Tondano Timur.</Text>
                <Text>Telp : (0431) 321171</Text>
              </View>
              <View style={{ borderWidth: 0.8, borderRadius: 4, marginBottom: 2 }}>
                <Text>RSUD Kota Kotamobagu</Text>
                <Text>Telp : (0434) 822816</Text>
              </View>
          </ScrollView>
        </View>
      </View>
      </View>
    );
  }
}

export default App;