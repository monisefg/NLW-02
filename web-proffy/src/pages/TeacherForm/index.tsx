import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import useForm, { Form } from '../../hooks/useForm';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';
import Button from '../../components/Button';

function TeacherForm() {
  const initialValues: Form = {
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  };
  const { handleChange, values } = useForm(initialValues);

  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 1,
      from: '',
      to: '',
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 1,
        from: '',
        to: '',
      },
    ]);
  }

  function setScheduleItemValue(
    itemPosition: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === itemPosition) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api
      .post('/classes', {
        name: values.name,
        avatar: values.avatar,
        whatsapp: values.whatsapp,
        bio: values.bio,
        subject: values.subject,
        cost: Number(values.cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro!');
      });
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição.'
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label='Nome completo'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
            <Input
              label='Avatar'
              name='avatar'
              value={values.avatar}
              onChange={handleChange}
            />
            <Input
              label='Whatsapp'
              name='whatsapp'
              value={values.whatsapp}
              onChange={handleChange}
            />
            <Textarea
              label='Biografia'
              name='bio'
              value={values.bio}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label='Matéria'
              name='subject'
              value={values.subject}
              onChange={handleChange}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Math', label: 'Math' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Química', label: 'Química' },
              ]}
            />
            <Input
              label='Custo da sua hora por aula'
              name='cost'
              value={values.cost}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>
              <p>Horários disponíveis</p>
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className='schedule-item'>
                  <Select
                    label='Dia da semana'
                    name='week_day'
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    name='from'
                    label='Das'
                    type='time'
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name='to'
                    label='Até'
                    type='time'
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante! <br />
              Preencha todos os dados
            </p>
            <Button type='submit'>Salvar cadastro</Button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
