import { Rock, RockConfig, RockEvent, RockEventHandlerScript, handleComponentEvent } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, useRuiScope, renderRock } from "@ruijs/react-renderer";
import RapidFormMeta from "./RapidFormMeta";
import type { RapidFormRockConfig } from "./rapid-form-types";
import { each, get } from "lodash";
import { Form } from "antd";

export default {
  $type: "rapidForm",

  onResolveState(props, state) {
    const [form] = Form.useForm();
    return {
      form,
    };
  },

  onReceiveMessage(message, state, props) {
    // TODO: refactor to write less if-else
    if (message.name === "submit") {
      state.form.submit();
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

        const formItemWrapRock: RockConfig = {
          $id: `${props.$id}-item-${formItemConfig.code}-col`,
          $type: "antdCol",
          span: (24 / (props.column || 1)) * (formItemConfig.column || 1),
          children: {
            $id: `${props.$id}-item-${formItemConfig.code}`,
            $type: "rapidFormItem",
            ...formItemConfig,
          },
        };

        dataFormItemRocks.push(formItemWrapRock);
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
      formActionRocks.push(formActionRock);
    });

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
              wrapperCol: { offset: 8 },
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
      labelCol: { span: 8 },
      wrapperCol: { span: 16},
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