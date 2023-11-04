import { Rock, RockConfig, RockEvent, RockEventHandlerScript, handleComponentEvent } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import RapidFormMeta from "./RapidFormMeta";
import type { RapidFormRockConfig } from "./rapid-form-types";
import { assign, each, get } from "lodash";
import { Form, message as antdMessage } from "antd";

export default {
  $type: "rapidForm",

  onResolveState(props, state) {
    const [form] = Form.useForm();
    return {
      form,
    };
  },

  async onReceiveMessage(message, state, props) {
    // TODO: refactor to write less if-else
    if (message.name === "submit") {
      const form = state.form;
      try {
        const values = await form.validateFields();
        form.submit();
      } catch(err) {
        console.log(err);
      }
    } else if (message.name === "validateFields") {
      state.form.validateFields();
    } else if (message.name === "setFieldsValue") {
      state.form.setFieldsValue(message.payload);
    } else if (message.name === "resetFields") {
      state.form.resetFields();
      handleComponentEvent("onFormRefresh", message.framework, message.page as any, state.scope, props, props.onFormRefresh, {form: state.form});
    } else if (message.name === "refreshView") {
      state.form.resetFields();
      handleComponentEvent("onFormRefresh", message.framework, message.page as any, state.scope, props, props.onFormRefresh, {form: state.form});
    }
  },

  Renderer(context, props: RapidFormRockConfig, state: any) {
    const {framework, page, scope} = context;
    
    const dataFormItemRocks: RockConfig[] = [];
    if (props.items) {
      props.items.forEach((formItemConfig) => {
        (formItemConfig as any).form = state.form;

        let formItemRockConfig: RockConfig;
        if (formItemConfig.hidden) {
          formItemRockConfig = {
            $id: `${props.$id}-item-${formItemConfig.code}`,
            $type: "rapidFormItem",
            ...formItemConfig,
          };
        } else {
          formItemRockConfig = {
            $id: `${props.$id}-item-${formItemConfig.code}-col`,
            $type: "antdCol",
            span: (24 / (props.column || 1)) * (formItemConfig.column || 1),
            children: {
              $id: `${props.$id}-item-${formItemConfig.code}`,
              $type: "rapidFormItem",
              ...formItemConfig,
            },
          };
        }

        dataFormItemRocks.push(formItemRockConfig);
      })
    }

    const formActionRocks: RockConfig[] = [];
    each(props.actions, (formAction, index) => {
      const formActionRock: RockConfig = {
        $id: `${props.$id}-actions-${index}`,
        $type: "antdButton",
        children: {
          $type: "text",
          text: formAction.actionText,
        },
      };
      if (formAction.actionType === "submit") {
        formActionRock.type = "primary";
        formActionRock.htmlType = "submit";
      }
      assign(formActionRock, formAction.actionProps);
      formActionRocks.push(formActionRock);
    });

    const isHorizonLayout = !(props.layout === "vertical" || props.layout === "inline");

    const formActionsRowConfig: RockConfig = {
      $id: `${props.$id}-actions`,
      $type: "antdRow",
      gutter: 24,
      children: [
        {
          $id: `${props.$id}-actions-wrap-col`,
          $type: "antdCol",
          span: 24,
          children: [
            {
              $id: `${props.$id}-actions-wrap-form-item`,
              $type: "antdFormItem",
              wrapperCol: isHorizonLayout ? { offset: 8 } : null,
              children: formActionRocks,
            },
          ],
        },
      ]
    };

    let initialValues;
    if (props.dataSourceCode) {
      initialValues = {
        ...props.defaultFormFields,
        ...get(scope.stores[props.dataSourceCode], "data.list[0]"),
      };
    } else {
      initialValues = props.defaultFormFields;
    }

    const onValuesChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
      handleComponentEvent("onValuesChange", framework, page, scope, props, props.onValuesChange, event.args);
    };

    const formRockConfig: RockConfig = {
      $id: `${props.$id}-antdForm`,
      $type: "antdForm",
      form: state.form,
      labelCol: isHorizonLayout ? { span: 8 } : null,
      wrapperCol: isHorizonLayout ? { span: 16} : null,
      layout: props.layout,
      initialValues,
      children: [
        {
          $id: `${props.$id}-antdForm-items-row`,
          $type: "antdRow",
          gutter: 24,
          children: dataFormItemRocks,
        },
        ...(formActionRocks.length ? [formActionsRowConfig] : []),
      ],
      onFinish: props.onFinish,
      onValuesChange: {
        $action: "script",
        script: onValuesChange,
      },
    };

    let formSectionConfig: RockConfig;
    if (props.dataSourceCode) {
      formSectionConfig = {
        $id: `${props.$id}-show`,
        $type: "show",
        fallback: [
          {
            $id: `${props.$id}-spin`,
            $type: "antdSpin",
          }
        ],
        children: [ formRockConfig ],
        $exps: {
          when: `$scope.stores.${props.dataSourceCode}.data`,
        },
      }
    } else {
      formSectionConfig = formRockConfig;
    }
  
    const rockConfig: RockConfig = formSectionConfig;
    return renderRock({context, rockConfig});
  },

  ...RapidFormMeta
} as Rock;