import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TempleColors } from "@/constants/Colors";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console in development; swap in Crashlytics/Sentry here later
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="warning-outline" size={48} color={TempleColors.deepRed} />
        </View>

        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.subtitle}>
          The app encountered an unexpected error. Please try again or restart
          the app if the problem persists.
        </Text>

        <TouchableOpacity
          onPress={this.handleRetry}
          activeOpacity={0.85}
          style={styles.button}
        >
          <Ionicons name="refresh" size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>

        <Text style={styles.contact}>
          If this keeps happening, contact us at Info@sstgh.org
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TempleColors.warmWhite,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: TempleColors.deepRed + "12",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: TempleColors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: TempleColors.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: TempleColors.deepRed,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  contact: {
    fontSize: 12,
    color: TempleColors.textSecondary,
    textAlign: "center",
  },
});
