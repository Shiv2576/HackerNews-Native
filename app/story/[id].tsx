import { useLocalSearchParams } from "expo-router";
import { useStory } from "@/services/hooks/useStory";
import { Text } from "react-native";
import Loader from "@/components/Loader";

export default function StoryDetails() {
  const { id } = useLocalSearchParams();
  const { story, loading } = useStory(id as string);

  if (loading || !story) return <Loader />;

  return (
    <>
      <Text>{story.title}</Text>
      <Text>{story.score} points</Text>
    </>
  );
}
