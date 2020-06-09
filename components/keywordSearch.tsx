import { Message } from "models/message";
import { User } from "models/user";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import Button from "react-bootstrap/Button";
import { useState, useCallback, FormEvent } from "react";
import MessageList from "./messageList";
import { messagesToData, PlotData, countKeyword } from "utils/plotting";
import KeywordChart from "./charts/keywordChart";
import KeywordForm from "./forms/keywordForm";
import CenterDiv from "./centerDiv";

interface SearchResult {
  keyword: string;
  count: number;
  keyMessages: Message[];
}

export default (props: { messages: Message[]; users: User[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [keywordData, setKeywordData] = useState(Array<PlotData>());
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      let result = countKeyword(searchTerm, props.messages);
      setSearchResults(result);
      setKeywordData(messagesToData(result.keyMessages));
    },
    [searchTerm]
  );

  return (
    <Accordion>
      <Card>
        <Card.Header>
          <AccordionToggle as={Button} variant="link" eventKey="0">
            Search for keywords
          </AccordionToggle>
        </Card.Header>
        <AccordionCollapse eventKey="0">
          <Card.Body>
            <KeywordForm
              handleSubmit={handleSubmit}
              setSearchTerm={setSearchTerm}
            />
            <br></br>
            {searchResults ? (
              <>
                <CenterDiv>
                  <p>
                    "{searchResults.keyword}" occurs {searchResults.count} times
                    in this channel.
                  </p>
                  <KeywordChart keywordData={keywordData} />
                </CenterDiv>
                <MessageList
                  messages={searchResults.keyMessages}
                  users={props.users}
                ></MessageList>
              </>
            ) : (
              <p>Nothing is searched yet; try submitting something above.</p>
            )}
          </Card.Body>
        </AccordionCollapse>
      </Card>
    </Accordion>
  );
};
