import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import useTodayActivity from "./hooks/useTodayActivity";
import TodayItem from "./TodayItem";

function TodayActivity() {
  const { activities, isLoadingTodayActivities } = useTodayActivity();

  return (
    <StyledToday>
      <Row>
        <Heading as="h3">Today</Heading>
      </Row>

      {isLoadingTodayActivities ? (
        <Spinner />
      ) : activities?.length ? (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activity today</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
