import Button from 'components/Button';
import Input from 'components/Input';
import styles from './index.module.scss'

// props: items minLength maxLength onChange() onSave() onEdit() onDelete()
export default function Items(props) {
  return (
    <div
      className={styles['Items']}
    >
      {props.items.map(item => (
        <div key={item.id} className={styles['item']}>
          {item.isEditing ? (
            <>
              <Input
                type="text"
                value={item.tempValue}
                onChange={e => props.onChange(item, e.target.value)}
                min={props.minLength}
                max={props.maxLength}
              />
              <Button text="Save" onClick={e => props.onSave(item)} disabled={item.tempValue.length < props.minLength}></Button>
            </>
          ) : (
            <>
              <span>{item.value}</span>
              <div className={styles['actions']}>
                <Button icon="edit" onClick={e => props.onEdit(item)}></Button>
                <Button icon="delete" onClick={e => props.onDelete(item)}></Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}