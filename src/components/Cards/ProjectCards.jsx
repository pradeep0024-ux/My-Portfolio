import styled from 'styled-components'

// 🔹 Button Styles
const Button = styled.a`
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.primary}15; /* light tint of primary */
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary}30;
    color: ${({ theme }) => theme.white};
    transform: scale(1.05);
  }
`;

// 🔹 Flex container for buttons
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto; /* pushes buttons to bottom */
`;

// 🔹 Card container
const Card = styled.div`
  width: 330px;
  height: 450px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
    filter: brightness(1.1);
  }
`;

// 🔹 Project Image
const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
  ${'' /* object-fit: cover; */}
`;

// 🔹 Tags
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary}22;
  padding: 5px 10px;
  border-radius: 10px;
`;

// 🔹 Details Section
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 2px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

// 🔹 Members (avatars)
const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;

// 🔹 Main Component
const ProjectCards = ({ project, setOpenModal }) => {
  return (
    <Card>
      <Image src={project.image} />
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>

      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>

      <Members>
        {project.member?.map((member, i) => (
          <Avatar key={i} src={member.img} />
        ))}
      </Members>

      {/* 🔹 Two Buttons in Row */}
      <ButtonRow>
        {/* GitHub is mandatory */}
        <Button href={project.github} target="_blank">
          View Code
        </Button>

        {/* Project link only if available */}
        {project.webapp && (
          <Button href={project.webapp} target="_blank">
            View Project
          </Button>
        )}
      </ButtonRow>
    </Card>
  );
};

export default ProjectCards;
