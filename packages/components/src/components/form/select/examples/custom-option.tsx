import { MenuListProps, OptionProps } from 'react-select';

import Button from '../../../button/button';
import { Col, Row } from '../../../grid';
import Tag from '../../../tag/tag';
import { VerticalSpacing } from '../../../vertical-spacing';
import Select, { ISelectOption } from '../select';

interface AppealData {
  id: string;
  name: string;
  age: number;
  personalCode: string;
  aadress: string;
  type?: 'L' | 'J';
}

const searchResults: AppealData[] = [
  {
    id: '1',
    name: 'Triinu Liis Kassisaba',
    age: 9,
    personalCode: '499050539124',
    aadress: 'Pihlaka tn 32A, 11213 Nõmme, Tallinn, Harju maakond',
    type: 'L',
  },
  {
    id: '2',
    name: 'Triin Lamp',
    age: 16,
    personalCode: '499050539123',
    aadress: 'Pihlaka tn 11A, 11213 Nõmme, Tallinn, Harju maakond',
    type: 'L',
  },
  {
    id: '3',
    name: 'Triin Kass',
    age: 12,
    personalCode: '499050539124',
    aadress: 'Pihlaka tn 23A, 11213 Nõmme, Tallinn, Harju maakond',
    type: 'J',
  },
  {
    id: '4',
    name: 'Triin Marie Metsaots',
    age: 22,
    personalCode: '499050539124',
    aadress: 'Pihlaka tn 23A, 11213 Nõmme, Tallinn, Harju maakond',
  },
  {
    id: '5',
    name: 'Triin Paar',
    age: 3,
    personalCode: '499050539111',
    aadress: 'Pihlaka tn 23A, 11213 Nõmme, Tartu, Tartu maakond',
  },
  {
    id: '6',
    name: 'Triin Paar',
    age: 3,
    personalCode: '499050539111',
    aadress: 'Pihlaka tn 23A, 11213 Nõmme, Tartu, Tartu maakond',
  },
  {
    id: '7',
    name: 'Triin Paar',
    age: 3,
    personalCode: '499050539111',
    aadress: 'Pihlaka tn 23A, 11213 Nõmme, Tartu, Tartu maakond',
  },
];

export const CustomOptionSelect = () => {
  const selectOptions: ISelectOption[] = searchResults.map((option) => ({
    label: option.name,
    value: option.id,
    customData: option,
  }));

  return (
    <Select
      label="Nimi või isikukood"
      id="appeal-select"
      options={selectOptions}
      renderOption={(props) => <CustomOption {...props} />}
      renderMessageListFooter={(props) => <CustomMessageListFooter {...props} />}
    />
  );
};

const CustomOption = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
  const { aadress, age, name, personalCode, type }: AppealData = props.data.customData as AppealData;

  return (
    <Row gutterX={2}>
      {type && (
        <Col width="auto">
          <Tag size="small" color={type === 'L' ? 'warning' : 'important'}>
            {type}
          </Tag>
        </Col>
      )}
      <Col>
        <p className="text-primary">
          <b>{name}</b> · {`${age}a`} · {personalCode}
        </p>
        <p className="text-small text-secondary">{aadress}</p>
      </Col>
    </Row>
  );
};

const CustomMessageListFooter = (props: MenuListProps<ISelectOption, boolean>): JSX.Element => {
  return (
    <VerticalSpacing className="text-center" size={0.75}>
      <Row justifyContent="center" gutterX={2}>
        <Col width="auto">
          <Button size="small" visualType="secondary">
            Isik teadmata
          </Button>
        </Col>
        <Col width="auto">
          <Button size="small" visualType="secondary">
            Puudub Eesti isikukood
          </Button>
        </Col>
      </Row>
      <p className="text-small text-secondary">Rahvastikuregistri andmete päringuks sisesta isikukood täismahus.</p>
    </VerticalSpacing>
  );
};