import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Accordion } from "../../components/Accordion";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function AccordionContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="Accordion" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Accordion title="What is React Native?">
          <Text style={styles.paragraph}>
            React Native is a popular framework that enables you to build native
            mobile applications using JavaScript and React. It allows developers
            to create apps for both iOS and Android platforms using a single
            codebase.
          </Text>
        </Accordion>

        <Accordion title="Why use Expo?">
          <Text style={styles.paragraph}>
            Expo is a framework and platform built around React Native that
            helps you develop, build, and deploy mobile applications. It
            provides a set of pre-built components and APIs that make mobile
            development easier and faster.
          </Text>
        </Accordion>

        <Accordion title="Features" initiallyExpanded>
          <View style={styles.featureList}>
            <Text style={styles.feature}>
              • Smooth animations with Reanimated
            </Text>
            <Text style={styles.feature}>• Customizable styling</Text>
            <Text style={styles.feature}>• TypeScript support</Text>
            <Text style={styles.feature}>• Nested content support</Text>
            <Text style={styles.feature}>• Initial state control</Text>
          </View>
        </Accordion>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    color: "#666",
  },
});
