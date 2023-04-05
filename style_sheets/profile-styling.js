import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderTopColor: "transparent",
  },
  loading:{
    fontSize:20,
  },
  topBar: {
    padding: 0,
    paddingBottom: 5,
    backgroundColor: "#2b5f6b",
  },
  bottomBar: {
    backgroundColor: "#ddd",
    padding: 15,
    paddingBottom: 0,
  },
  avatarContainer: {
    padding: 10,
    paddingTop: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyImg: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 5,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  avatar: {
    margin: 20,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "#132235",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    padding: 0,
    margin: 0,
    color: "#132235",
    fontSize: 14,
    marginBottom: 15,
    fontStyle: 'italic'
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    marginTop: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  userItem: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  statValue: {
    padding: 10,
    marginRight: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
  },
  logout: {
    justifyContent: "center",
    marginTop: 30,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logText: {
    fontSize: 16,
    color: "#132235",
  },
});