import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2B5F6B",
    alignContent: "center",
  },

  ScrollView:{
    flex: 1, 
  },

  formContainer: {
    flex: 1,
    paddingBottom: 60,
    justifyContent:'center',
  },

  main: {
    flex:1, 
    margin: 0,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5, 
  },
  header: {
    padding: 15,
    textAlign: "left",
  },
  headerText: {
    fontSize: 20,
  },
  avatarContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyImg: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginTop: 30,
    width: "100%",
    height: 100,
    maxWidth: 360,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
  },

  input: {
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  submit: {
    backgroundColor: "#5CDB95",
    alignSelf: "stretch",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginTop:5,
  },

  underline:{
    textDecorationLine: 'underline',
  },
  error: {
    color: "red",
  },
});
