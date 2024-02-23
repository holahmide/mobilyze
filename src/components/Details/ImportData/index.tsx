import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Modal from '../../../utils/components/Modal';
import { useGlobalContext } from '../../../context';
import { Location } from '../../../context/interfaces';
import { toast } from 'react-toastify';

const allowedExtensions = ['csv'];

interface ImportDataProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ImportDataModal = ({ isOpen, closeModal }: ImportDataProps) => {
  const [data, setData] = useState<Location[]>([]);
  const [file, setFile] = useState<Blob | null>();

  const { dispatch } = useGlobalContext();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        alert('Please input a csv file');
        return;
      }
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return alert('Enter a valid file');

    const reader = new FileReader();
    reader.onload = async ({ target }: { target: any }) => {
      const csv = Papa.parse(target.result, {
        header: true
      });
      setData(csv.data as Location[]);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    return setFile(null);
  }, []);

  useEffect(() => {
    if (data.length) {
      console.log(data);
      dispatch({ type: 'IMPORT_DATA', payload: data });
      toast('New locations data imported successfully', { type: 'success' });
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Import Data"
      styles={{ minWidth: '500px' }}
    >
      <div className="App">
        <p>Please note the following headers for your csv data;</p>
        <ul>
          <li>label</li>
          <li>
            lat: <i>required</i>
          </li>
          <li>
            lng: <i>required</i>
          </li>
          <li>id</li>
        </ul>
        <input onChange={handleFileChange} id="csvInput" name="file" type="File" />

        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button onClick={handleParse}>Import</button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportDataModal;
