import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      positif: '',
      sembuh: '',
      meninggal: '',
      data: [],
      refresh: false,
    }
  }

  componentDidMount =() =>{
    this.setState({refresh: true})
    fetch('https://covid19.mathdro.id/api')
    .then(response => response.json())
        .then(json => (
            this.setState({positif: json.confirmed.value}),
            this.setState({sembuh: json.recovered.value}),
            this.setState({meninggal: json.deaths.value})
        )
      )
    fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
      .then(response => response.json())
      .then(json => this.setState({data: json.data, refresh: false}))
  }

  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 8, marginBottom: 30 }}>
        <View style={{ flex: 1, marginTop: 50, marginBottom: 20 }}>
          <Text style={{ alignSelf: "center", fontSize: 21, fontWeight:"bold" }}>Data COVID-19 Global & Indonesia</Text>
        </View>
  
        <View style={{ flex: 4, marginBottom: 30 }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold"}}>Global</Text>
          </View>
          <View style={{ flex: 1, flexDirection:"row", justifyContent: "center" }}>
            <View style={{ flex: 1, height: 90, width: 100, backgroundColor: "yellow", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Positif</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.positif}</Text>
            </View>
            <View style={{ flex: 1, marginHorizontal: 10, height: 90, width: 100, backgroundColor: "green", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Sembuh</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.sembuh}</Text>
            </View>
            <View style={{ flex: 1, height: 90, width: 100, backgroundColor: "red", borderRadius: 16, justifyContent: "center", borderWidth: 0.3 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf:"center" }}>Meninggal</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>{this.state.meninggal}</Text>
            </View>
          </View>
        </View>
  
        <View style={{ flex: 15, marginTop: 20, marginBottom: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold"}}>Indonesia</Text>
          </View>
          <View>
            <FlatList
              data={this.state.data}
              keyExtractor={item => item.fid.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 6, marginBottom: 4, height: 40, justifyContent: "center" }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ marginLeft: 4 }}>{item.provinsi}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "yellow", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
                      <Text style={{ alignSelf: "center" }}>{item.kasusPosi}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "green", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
                      <Text style={{ alignSelf: "center" }}>{item.kasusSemb}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "red", borderRadius: 4, borderWidth: 0.8, marginVertical: 4, marginHorizontal: 2 }}>
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
      </View>
    );
  }
}